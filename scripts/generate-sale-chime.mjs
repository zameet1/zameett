import fs from "node:fs";
import path from "node:path";

const sampleRate = 44100;
const duration = 1.35;
const sampleCount = Math.floor(sampleRate * duration);
const samples = new Float64Array(sampleCount);

let randomState = 0x5a4d4545;
function noise() {
  randomState = (1664525 * randomState + 1013904223) >>> 0;
  return randomState / 0xffffffff * 2 - 1;
}

function addBell(frequency, level, decay, detune = 0) {
  const modes = [[1, 1], [2.03, 0.34], [3.91, 0.15], [5.42, 0.07]];
  for (let index = 0; index < sampleCount; index += 1) {
    const time = index / sampleRate;
    const attack = Math.min(1, time / 0.003);
    const envelope = attack * Math.exp(-time / decay);
    let value = 0;
    for (const [ratio, strength] of modes) {
      value += Math.sin(2 * Math.PI * (frequency * ratio + detune) * time) * strength;
    }
    samples[index] += value * envelope * level;
  }
}

function addImpact() {
  let previous = 0;
  const impactSamples = Math.floor(sampleRate * 0.055);
  for (let index = 0; index < impactSamples; index += 1) {
    const time = index / sampleRate;
    const raw = noise();
    const bright = raw - previous * 0.82;
    previous = raw;
    samples[index] += bright * Math.exp(-time / 0.012) * 0.12;
    samples[index] += Math.sin(2 * Math.PI * 185 * time) * Math.exp(-time / 0.025) * 0.035;
  }
}

addImpact();
addBell(1318.51, 0.16, 0.55);
addBell(1975.53, 0.09, 0.42, -1.2);
addBell(2637.02, 0.045, 0.31, 1.7);

const dry = samples.slice();
for (const [delay, level] of [[0.047, 0.13], [0.083, 0.075], [0.131, 0.035]]) {
  const offset = Math.floor(delay * sampleRate);
  for (let index = offset; index < sampleCount; index += 1) {
    samples[index] += dry[index - offset] * level;
  }
}

let peak = 0;
for (let index = 0; index < sampleCount; index += 1) {
  samples[index] = Math.tanh(samples[index] * 1.4);
  peak = Math.max(peak, Math.abs(samples[index]));
}

const normalization = peak ? 0.82 / peak : 1;
const dataSize = sampleCount * 2;
const wav = Buffer.alloc(44 + dataSize);
wav.write("RIFF", 0);
wav.writeUInt32LE(36 + dataSize, 4);
wav.write("WAVE", 8);
wav.write("fmt ", 12);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20);
wav.writeUInt16LE(1, 22);
wav.writeUInt32LE(sampleRate, 24);
wav.writeUInt32LE(sampleRate * 2, 28);
wav.writeUInt16LE(2, 32);
wav.writeUInt16LE(16, 34);
wav.write("data", 36);
wav.writeUInt32LE(dataSize, 40);

for (let index = 0; index < sampleCount; index += 1) {
  wav.writeInt16LE(
    Math.max(-32768, Math.min(32767, Math.round(samples[index] * normalization * 32767))),
    44 + index * 2,
  );
}

const outputDir = path.join(process.cwd(), "public", "audio");
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "zameett-sale-chime-v4.wav"), wav);