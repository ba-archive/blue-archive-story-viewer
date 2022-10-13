module.exports = {
  plugins: [
    require.resolve("@trivago/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-css-order"),
  ],
  singleQuote: false,
  trailingComma: "es5",
  useTabs: false,
  importOrder: [
    "^([a-zA-Z0-9-]+)$",
    "^[^#](.+)/(.+)$",
    "^#(.+)/(.+)$",
    "^[.](.*)",
  ],
  importOrderCaseInsensitive: false,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
};
