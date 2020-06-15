class Club {
  constructor(
    id = 1045, areaName = 'England', name = '', shortName = '', tla = '',
    address = '', phone = '', website = '',
    email = '', founded = 1900, clubColors = '', venue = '', crestUrl = '',
  ) {
    this.id = id;
    this.area = {
      id: 2072,
      name: areaName,
    };
    this.name = name;
    this.shortName = shortName;
    this.tla = tla;
    this.crestUrl = crestUrl;
    this.address = address;
    this.phone = phone;
    this.website = website;
    this.email = email;
    this.founded = founded;
    this.clubColors = clubColors;
    this.venue = venue;
    this.lastUpdated = Date.now();
  }
}

module.exports = Club;
