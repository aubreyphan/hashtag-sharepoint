declare interface IAppWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'AppWebPartStrings' {
  const strings: IAppWebPartStrings;
  export = strings;
}
