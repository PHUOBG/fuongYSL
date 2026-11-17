import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CATALOG_PRODUCTS,
  calculateCartCount,
  calculateCartSubtotal,
  computeCountdownParts,
  filterAndSortProducts,
  formatVnd,
  validateRsvpForm,
} from './catalog';

test('formatVnd formats Vietnamese currency cleanly', () => {
  assert.equal(formatVnd(1210000), '1.210.000 ₫');
  assert.equal(formatVnd(4850000), '4.850.000 ₫');
});

test('filterAndSortProducts filters by category, wishlist, and search query', () => {
  const lipsticks = filterAndSortProducts(CATALOG_PRODUCTS, {
    activeTab: 'lipstick',
    searchQuery: '',
    sortBy: 'featured',
    wishlistIds: [],
  });
  assert.equal(lipsticks.length, 2);

  const libreSearch = filterAndSortProducts(CATALOG_PRODUCTS, {
    activeTab: 'all',
    searchQuery: 'libre',
    sortBy: 'featured',
    wishlistIds: [],
  });
  assert.equal(libreSearch.length, 2);

  const wishlistOnly = filterAndSortProducts(CATALOG_PRODUCTS, {
    activeTab: 'wishlist',
    searchQuery: '',
    sortBy: 'featured',
    wishlistIds: ['inks-vinyl-416', 'myslf-edp'],
  });
  assert.equal(wishlistOnly.length, 2);
});

test('filterAndSortProducts sorts by price ascending and descending', () => {
  const asc = filterAndSortProducts(CATALOG_PRODUCTS, {
    activeTab: 'all',
    searchQuery: '',
    sortBy: 'price-asc',
    wishlistIds: [],
  });
  assert.equal(asc[0].id, 'loveshine-44');
  assert.equal(asc[asc.length - 1].id, 'vestiaire-blouse');

  const desc = filterAndSortProducts(CATALOG_PRODUCTS, {
    activeTab: 'all',
    searchQuery: '',
    sortBy: 'price-desc',
    wishlistIds: [],
  });
  assert.equal(desc[0].id, 'vestiaire-blouse');
});

test('cart calculations sum prices and quantities accurately', () => {
  const items = [
    {
      id: '1',
      productId: 'inks-vinyl-416',
      title: 'Son Kem #416',
      subtitle: 'Son môi',
      price: 1210000,
      image: '/img.jpg',
      quantity: 2,
    },
    {
      id: '2',
      productId: 'libre-holiday-50',
      title: 'Libre 50ml',
      subtitle: 'Nước hoa',
      price: 3850000,
      image: '/img2.jpg',
      quantity: 1,
    },
  ];
  assert.equal(calculateCartCount(items), 3);
  assert.equal(calculateCartSubtotal(items), 6270000);
});

test('computeCountdownParts pads days, hours, minutes, and seconds', () => {
  const initialSeconds = 7 * 86400 + 11 * 3600 + 28 * 60 + 0;
  assert.deepEqual(computeCountdownParts(initialSeconds), {
    days: '07',
    hours: '11',
    minutes: '28',
    seconds: '00',
  });
  assert.deepEqual(computeCountdownParts(-10), {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });
});

test('validateRsvpForm rejects empty required fields and accepts valid VIP RSVP', () => {
  const invalid = validateRsvpForm({
    fullName: '',
    phone: '123',
    productInterest: 'Son Kem The Inks Vinyl Cream #416 Đỏ',
    checkInDate: '',
    engravingWish: '',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.checkInDate);

  const valid = validateRsvpForm({
    fullName: 'Hoàng Minh Châu',
    phone: '090 982 1234',
    productInterest: 'Son Kem The Inks Vinyl Cream #416 Đỏ',
    checkInDate: '2026-12-24',
    engravingWish: 'MADAME HELENA 2026',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});
