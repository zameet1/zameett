import "server-only";

export async function getGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  const placeId = process.env.GOOGLE_PLACE_ID?.trim();
  if (!apiKey || !placeId) return { configured: false, reviews: [] };
  if (!/^[A-Za-z0-9_-]+$/.test(placeId)) return { configured: false, reviews: [] };

  try {
    const response = await fetch(`https://places.googleapis.com/v1/places/${placeId}?languageCode=en`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "id,displayName,rating,userRatingCount,googleMapsUri,reviews",
      },
      next: { revalidate: 21600 },
    });
    if (!response.ok) throw new Error(`Google Places request failed (${response.status})`);
    const place = await response.json();
    const reviews = (place.reviews || [])
      .filter((review) => review.text?.text && review.authorAttribution?.displayName)
      .slice(0, 3)
      .map((review, index) => ({
        id: review.name || review.googleMapsUri || `${review.authorAttribution.displayName}-${review.publishTime}`,
        name: review.authorAttribution.displayName,
        rating: Number(review.rating) || 5,
        text: review.text.text,
        relativeTime: review.relativePublishTimeDescription || null,
        mapsUri: review.googleMapsUri || place.googleMapsUri || null,
      }));

    return {
      configured: true,
      placeName: place.displayName?.text || "Zameett",
      rating: Number(place.rating) || null,
      totalReviews: Number(place.userRatingCount) || 0,
      mapsUri: place.googleMapsUri || null,
      reviews,
    };
  } catch (error) {
    return {
      configured: true,
      unavailable: true,
      message: error instanceof Error ? error.message : "Google Reviews are temporarily unavailable.",
      reviews: [],
    };
  }
}
