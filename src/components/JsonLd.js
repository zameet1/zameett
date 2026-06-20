export default function JsonLd({ data }) {
  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
}
