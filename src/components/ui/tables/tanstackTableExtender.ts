import type {
  RowData,
  Table,
  TableOptions,
  TableOptionsResolved
} from "@tanstack/table-core";
import { createTable } from "@tanstack/table-core";
import '@tanstack/table-core'

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    thClassList?: string[],
    tdClassList?: string[]
  }
}

export function flexRender<TProps extends object>(comp: any, props: TProps) {
  if (typeof comp === 'function') {
    return comp(props)
  }
  return comp
}

export function createVanillaTable<TData extends RowData>(
  options: TableOptions<TData>
): Table<TData> {

  // Compose in the generic options to the user options
  const resolvedOptions: TableOptionsResolved<TData> = {
    state: {}, // Dummy state
    renderFallbackValue: null,
    ...options,
    onStateChange: (updater) => {
      if (typeof updater === 'function') {
        table.options.state = updater(table.getState())
      } else {
        table.options.state = updater
      }
      options.onStateChange?.(updater)
    },
  }

  // Create the table
  const table = createTable<TData>(resolvedOptions)

  return table
}