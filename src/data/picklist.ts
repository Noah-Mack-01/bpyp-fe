import { ViewStyle } from "react-native"

export type PickListProps = {
  options: PickListOption[]
  style?: ViewStyle
  label?: string
  selectLabel?: string
  onSelectedChange?: (event: PickListOption)=>void
}

export type PickListOption = {
  default?:boolean;
  value: string;
  label: string;
}