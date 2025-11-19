# Orama Search Components

This directory contains components for creating a Node.js-styled Orama Search Box.

A search modal is constructed using the following format, but additional components can also be used.

```jsx
<SearchModal client={myOramaClient} placeholder={'Search for something...'}>
  <SearchResults
    noResultsTitle={'No results found for'}
    onHit={hit => <MySearchItemComponent hit={hit} />}
  >
    {/* If you want to include search suggestions, there's a SearchSuggestions
    component */}
    <SearchSuggestions
      suggestions={['You should search this', 'or this']}
      label={'Suggestions'}
    />
  </SearchResults>
</SearchModal>
```

(For this example, `myOramaClient` and `MySearchItemComponent` refer to the Orama client, and search item component, respectively. These variables **are not** included in @node-core/ui-components at this time)
