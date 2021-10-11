// export const sorter = (type, arr) => {
//   switch (type) {
//     case 'Popularity Ascending':
//       return arr.sort((a, b) => a.popularity - b.popularity);

//     case 'Popularity Descending':
//       return arr.sort((a, b) => a.popularity - b.popularity);

//     case 'Rating Ascending':
//       return arr.sort((a, b) => a.vote_average - b.vote_average);

//     case 'Rating Descending':
//       return arr.sort((a, b) => b.vote_average - a.vote_average);

//     case 'Release Date Descending':
//       return arr.sort(
//         (a, b) => new Date(b.release_date) - new Date(a.release_date),
//       );

//     case 'Release Date Ascending':
//       return arr.sort(
//         (a, b) => new Date(a.release_date) - new Date(b.release_date),
//       );
//     case 'Title (A-Z)':
//       return arr.sort((a, b) => (a.title > b.title) - (a.title < b.title));
//     case 'Title (Z-A)':
//       return arr.sort((a, b) => (b.title > a.title) - (b.title < a.title));

//     default:
//       return arr;
//   }
// };
