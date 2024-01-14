import { AppRoute } from '../app';

export function getReviewRoute(filmId: string): string {
  return AppRoute.ReviewPage.replace(':id', `${filmId}`);
}
