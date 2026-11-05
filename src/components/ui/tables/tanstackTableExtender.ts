import type {
  CellData,
  RowData,
  TableFeatures,
  TableOptions,
} from "@tanstack/table-core";
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  constructTable,
  coreFeatures,
  createCoreRowModel,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_arrIncludesSome,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
} from "@tanstack/table-core";
import { storeReactivityBindings } from "@tanstack/table-core/store-reactivity-bindings";

declare module '@tanstack/table-core' {
  interface ColumnMeta<TFeatures extends TableFeatures, TData extends RowData, TValue extends CellData = CellData> {
    thClassList?: string[],
    tdClassList?: string[]
  }
}

export const communityToolsFeatures = tableFeatures({
  ...coreFeatures,
  coreReactivityFeature: storeReactivityBindings(),
  coreRowModel: createCoreRowModel(),
  columnFilteringFeature,
  globalFilteringFeature,
  rowSortingFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  filterFns: { arrIncludesSome: filterFn_arrIncludesSome },
  sortFns: { alphanumeric: sortFn_alphanumeric },
});

export function flexRender<TProps extends object>(comp: any, props: TProps) {
  if (typeof comp === 'function') {
    return comp(props)
  }
  return comp
}

export function createVanillaTable<TData extends RowData>(
  options: Omit<TableOptions<typeof communityToolsFeatures, TData>, 'features'>
) {
  return constructTable<typeof communityToolsFeatures, TData>({
    features: communityToolsFeatures,
    renderFallbackValue: null,
    ...options,
  });
}
