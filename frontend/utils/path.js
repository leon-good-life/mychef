// home
export const HOME = `/:lang/`

// cook
export const COOK = `/:lang/cook/`
export const COOK_CONTACT = `/:lang/cook/contact/`
export const COOK_DISHES = `/:lang/cook/dishes/`
export const COOK_DISHES_ADD = `/:lang/cook/dishes/add/`
export const COOK_DISHES_EDIT = `/:lang/cook/dishes/edit/:dishId/`
export const COOK_ORDERS = `/:lang/cook/orders/`

// order
export const ORDER = `/:lang/order/`

// admin
export const ADMIN = `/:lang/admin/`
export const ADMIN_USERS = `/:lang/admin/users/`
export const ADMIN_DISHES = `/:lang/admin/dishes/`
export const ADMIN_ORDERS = `/:lang/admin/orders/`

// home
export const home = lang => `/${lang}/`

// cook
export const cook = lang => `/${lang}/cook/`
export const cook_contact = lang => `/${lang}/cook/contact/`
export const cook_dishes = lang => `/${lang}/cook/dishes/`
export const cook_dishes_add = lang => `/${lang}/cook/dishes/add/`
export const cook_dishes_edit = (lang, id) => `/${lang}/cook/dishes/edit/${id}/`
export const cook_orders = lang => `/${lang}/cook/orders/`

// order
export const order = lang => `/${lang}/order/`

// admin
export const admin = lang => `/${lang}/admin/`
export const admin_users = lang => `/${lang}/admin/users/`
export const admin_dishes = lang => `/${lang}/admin/dishes/`
export const admin_orders = lang => `/${lang}/admin/orders/`

// change language
export const changeLang = lang =>
  window.location.pathname.replace(/\/\w\w\//, `/${lang}/`)
