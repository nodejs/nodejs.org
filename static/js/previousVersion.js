/* eslint-env jquery */

$(function () {
  $('#tbVersions').fancyTable({
    pagination: true,
    perPage: 10,
    globalSearch: true,
    exactMatch: 'auto',
    globalSearchExcludeColumns: [3, 4, 6, 7],
    sortable: false, // We don't allow sorting because it will make orders at mass
    inputPlaceholder:
      "Type versions of Node.js or npm to search (e.g: 'Node.js 14.17.5' or '6.14.14' ...)"
  });
});
