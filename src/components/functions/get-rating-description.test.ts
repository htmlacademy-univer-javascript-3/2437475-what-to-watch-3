import { getRatingDescription } from "./get-rating-description";

describe('getRatingDescription', () => {
  it('should return "Bad" when rating is between 0 and 3 (exclusive)', () => {
    const rating = 2;
    const result = getRatingDescription(rating);
    expect(result).toBe('Bad');
  });

  it('should return "Normal" when rating is between 3 and 5 (exclusive)', () => {
    const rating = 4;
    const result = getRatingDescription(rating);
    expect(result).toBe('Normal');
  });

  it('should return "Good" when rating is between 5 and 8 (exclusive)', () => {
    const rating = 7;
    const result = getRatingDescription(rating);
    expect(result).toBe('Good');
  });

  it('should return "Very good" when rating is between 8 and 10 (exclusive)', () => {
    const rating = 9;
    const result = getRatingDescription(rating);
    expect(result).toBe('Very good');
  });

  it('should return "Awesome" when rating is 10', () => {
    const rating = 10;
    const result = getRatingDescription(rating);
    expect(result).toBe('Awesome');
  });

  it('should return "Invalid rating" when rating is negative', () => {
    const rating = -1;
    const result = getRatingDescription(rating);
    expect(result).toBe('Invalid rating');
  });

  it('should return "Invalid rating" when rating is greater than 10', () => {
    const rating = 11;
    const result = getRatingDescription(rating);
    expect(result).toBe('Invalid rating');
  });
});
