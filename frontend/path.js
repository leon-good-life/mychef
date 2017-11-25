// home
export const HOME = `/:lang/`

// cook
export const COOK = `/:lang/chef/`
export const COOK_CONTACT = `/:lang/chef/contact/`
export const COOK_DISHES = `/:lang/chef/dishes/`
export const COOK_DISHES_ADD = `/:lang/chef/dishes/add/`
export const COOK_DISHES_EDIT = `/:lang/chef/dishes/edit/:dishId/`
export const COOK_ORDERS = `/:lang/chef/orders/`

// order
export const ORDER = `/:lang/customer/`

// admin
export const ADMIN = `/:lang/admin/`
export const ADMIN_USERS = `/:lang/admin/users/`
export const ADMIN_DISHES = `/:lang/admin/dishes/`
export const ADMIN_ORDERS = `/:lang/admin/orders/`

// home
export const home = lang => `/${lang}/`

// cook
export const cook = lang => `/${lang}/chef/`
export const cook_contact = lang => `/${lang}/chef/contact/`
export const cook_dishes = lang => `/${lang}/chef/dishes/`
export const cook_dishes_add = lang => `/${lang}/chef/dishes/add/`
export const cook_dishes_edit = (lang, id) => `/${lang}/chef/dishes/edit/${id}/`
export const cook_orders = lang => `/${lang}/chef/orders/`

// order
export const order = lang => `/${lang}/customer/`

// admin
export const admin = lang => `/${lang}/admin/`
export const admin_users = lang => `/${lang}/admin/users/`
export const admin_dishes = lang => `/${lang}/admin/dishes/`
export const admin_orders = lang => `/${lang}/admin/orders/`

// change language
export const changeLang = lang =>
  window.location.pathname.replace(/\/\w\w\//, `/${lang}/`)
