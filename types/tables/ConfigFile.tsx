export default interface ConfigFile {
  data?: any;
  name?: string;
  search?: boolean;
  render?: any; 
  numeric?: boolean | undefined;
  renderEncabezado?: any;
  onPressCell?: (data:any) => void | undefined;
  numericHeader?: boolean;
}