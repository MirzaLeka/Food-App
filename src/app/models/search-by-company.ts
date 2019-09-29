export default class SearchByCompany {
  companyName: string;
  categories: [];
  sortOpitons: [];
  limit: number;

  constructor(companyName, categories, sortOptions, limit) {
    this.companyName = companyName;
    this.categories = categories;
    this.sortOpitons = sortOptions;
    this.limit = limit;
  }
}
