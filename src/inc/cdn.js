
export default class CDN_Link {
  constructor(prefix, fileName) {
    this.endpoint = 'https://assets-oliverhickmanmusic.nyc3.cdn.digitaloceanspaces.com';
    this.fileName = fileName;
    this.prefix = prefix;
  }

  getAssetLink() {
    return `${this.endpoint}/${this.prefix}/${this.fileName}`;
  }
}