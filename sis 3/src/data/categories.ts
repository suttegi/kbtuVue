export interface Category {
  id: string;
  name: string;
  titles: string[];
}

export const categories: Category[] = [
  {
    id: 'vegetables',
    name: 'vegetables',
    titles: ['Cucumber', 'Green Bell Pepper', 'Green Chili Pepper', 'Potatoes', 'Red Onions'],
  },
  {
    id: 'fruits',
    name: 'fruits',
    titles: ['Apple', 'Kiwi', 'Lemon', 'Mulberry', 'Strawberry'],
  },
  {
    id: 'meat',
    name: 'meat & fish',
    titles: ['Beef Steak', 'Chicken Meat', 'Fish Steak'],
  },
  {
    id: 'dairy',
    name: 'dairy & eggs',
    titles: ['Eggs', 'Milk', 'Ice Cream'],
  },
  {
    id: 'drinks',
    name: 'drinks',
    titles: ['Juice', 'Soft Drinks', 'Water', 'Nescafe Coffee'],
  },
  {
    id: 'pantry',
    name: 'pantry',
    titles: ['Cooking Oil', 'Honey Jar', 'Rice', 'Protein Powder'],
  },
  {
    id: 'home',
    name: 'home & pets',
    titles: ['Cat Food', 'Dog Food', 'Tissue Paper Box'],
  },
];

export const categoryOf = (title: string): string =>
  categories.find((c) => c.titles.includes(title))?.name ?? 'other';
