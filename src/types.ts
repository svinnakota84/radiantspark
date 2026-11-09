/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CountryView = 'global' | 'india' | 'usa' | 'sparkdeals' | 'brain' | 'lifestyle';

export interface DealItem {
  id: string;
  title: string;
  category: 'energy' | 'electronics' | 'beverages' | 'food' | 'logistics';
  description: string;
  amazonUsaUrl?: string;
  amazonIndiaUrl?: string;
  walmartUrl?: string;
  flipkartUrl?: string;
  imageUrl?: string;
  /** Shown only when a configured feed supplies it together with priceCheckedAt. */
  price?: string;
  priceCheckedAt?: string;
}

export interface DivisionInfo {
  id: string;
  name: string;
  tagline: string;
  category: string;
  description: string;
  features: string[];
  image: string;
  linkText: string;
}

export interface ServicePractice {
  number: string;
  badge: string;
  title: string;
  description: string;
  technologies: string[];
}
