import { getReviewRoute } from "./get-review-route";

describe('getReviewRoute', () => {
  it('should return the review route with the specified filmId', () => {
    const filmId = '123';
    const result = getReviewRoute(filmId);
    const expected = `/films/:id=${filmId}/review`;
    expect(result).toBe(expected);
  });
});