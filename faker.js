import faker from 'faker';

export const fetchFakeData = () => {
  const data = [];
  for (let i = 0; i <= 10; i += 1) {
    data.push({
      id: faker.random.uuid(),
      image_url: faker.image.imageUrl(),
      name: faker.company.companyName(),
    });
  }
  return data;
}