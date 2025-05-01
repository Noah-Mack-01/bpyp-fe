import { Dimensions, DimensionValue, ScaledSize, TextInput, ViewStyle } from "react-native"

export type PickListProps = {
  options: PickListOption[]
  style?: ViewStyle
  label?: string
  disabled?: boolean
  selectLabel?: string
  onSelectedChange?: (event: PickListOption)=>void
}

export type PickListOption = {
  default?:boolean;
  value: string;
  label: string;
}

export const PICKLIST_MAX_WIDTH: number = 75;
export function inputMaxWidth(dim: ScaledSize): number {
  return (dim.height > dim.width) ? 200 : 125;
}