const Country = require('../../country/Country');

module.exports = (company, callback) => {

  if (!company.country) {
    return callback(null, {
      _id: company._id,
      company_name: company.company_name,
      email: company.email,
      country: '',
      country_name: '',
      profile_photo: company.profile_photo,
      phone_number: company.phone_number,
      account_holder_name: company.account_holder_name,
      timezone: company.timezone,
      credit: company.credit || 0,
      complete: company.company_name && company.company_name.length && company.country && company.country.length
    });
  } else {
    Country.getCountryWithAlpha2Code(company.country, (err, country) => {
      if (err || !country) return callback(err || 'bad_request');

      return callback(null, {
        _id: company._id,
        company_name: company.company_name,
        email: company.email,
        country: company.country,
        country_name: country.name,
        profile_photo: company.profile_photo,
        phone_number: company.phone_number,
        account_holder_name: company.account_holder_name,
        timezone: company.timezone,
        credit: company.credit || 0,
        complete: company.company_name && company.company_name.length && company.country && company.country.length
      });
    });
  }
}
