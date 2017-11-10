import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import MainNav from './ui/MainNav'
import Cook from './ui/cook/Cook'
import Order from './ui/order/Order'
import Admin from './ui/admin/Admin'
import Footer from './ui/Footer'
import './ui/main.css'

const App = ({
  isLoggedIn,
  login,
  logout,
  lang,
  changeLang,
  dishes,
  orders,
  isAdmin
}) => {
  const orderComponent = () => <Order lang={lang} dishes={dishes} />
  const cookComponent = () => (
    <Cook
      isLoggedIn={isLoggedIn}
      login={login}
      logout={logout}
      lang={lang}
      dishes={dishes}
      orders={orders}
    />
  )
  const adminComponent = () => <Admin lang={lang} logout={logout} />
  return (
    <BrowserRouter>
      <div dir={lang === 'he' ? 'rtl' : 'ltr'}>
        <MainNav changeLang={changeLang} lang={lang} isAdmin={isAdmin} />
        <Switch>
          <Route path="/cook" render={cookComponent} />
          <Route path="/order" render={orderComponent} />
          {isAdmin && <Route path="/admin" render={adminComponent} />}
          <Route path="/" render={orderComponent} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: true,
      lang: 'en',
      orders: [],
      isAdmin: true,
      dishes: [
        {
          id: '31241234123',
          name: 'Tom Yum Goong',
          picture: 'https://food.mthai.com/app/uploads/2016/10/Tomyum.jpg',
          description: 'Sour and spicy Thai soup. Very famous.'
        },
        {
          id: '31241234124',
          name: 'Pad Krapao',
          picture:
            'http://4.bp.blogspot.com/-n6ufLIp4ZvY/VbxsInERIrI/AAAAAAAAAA0/UsCOSGnqewQ/s1600/img_0760.jpg',
          description: 'Stir fried chicken. Delicious Thai dish.'
        },
        {
          id: '31241234125',
          name: 'Pad Krapao',
          picture:
            'http://4.bp.blogspot.com/-n6ufLIp4ZvY/VbxsInERIrI/AAAAAAAAAA0/UsCOSGnqewQ/s1600/img_0760.jpg',
          description: 'Stir fried chicken. Delicious Thai dish.'
        },
        {
          id: '31241234126',
          name: 'Pad Krapao',
          picture:
            'http://4.bp.blogspot.com/-n6ufLIp4ZvY/VbxsInERIrI/AAAAAAAAAA0/UsCOSGnqewQ/s1600/img_0760.jpg',
          description: 'Stir fried chicken. Delicious Thai dish.'
        },
        {
          id: '41241234124',
          name: 'Pad Krapao',
          picture:
            'http://4.bp.blogspot.com/-n6ufLIp4ZvY/VbxsInERIrI/AAAAAAAAAA0/UsCOSGnqewQ/s1600/img_0760.jpg',
          description: 'Stir fried chicken. Delicious Thai dish.'
        },
        {
          id: '51241234124',
          name: 'Pad Krapao',
          picture:
            'http://4.bp.blogspot.com/-n6ufLIp4ZvY/VbxsInERIrI/AAAAAAAAAA0/UsCOSGnqewQ/s1600/img_0760.jpg',
          description: 'Stir fried chicken. Delicious Thai dish.'
        },
        {
          id: '61241234124',
          name: 'Pad Krapao',
          picture:
            'http://4.bp.blogspot.com/-n6ufLIp4ZvY/VbxsInERIrI/AAAAAAAAAA0/UsCOSGnqewQ/s1600/img_0760.jpg',
          description: 'Stir fried chicken. Delicious Thai dish.'
        },
        {
          id: '37241234124',
          name: 'Pad Krapao',
          picture:
            'http://4.bp.blogspot.com/-n6ufLIp4ZvY/VbxsInERIrI/AAAAAAAAAA0/UsCOSGnqewQ/s1600/img_0760.jpg',
          description: 'Stir fried chicken. Delicious Thai dish.'
        }
      ]
    }
    this.login = () => this.setState({ isLoggedIn: true })
    this.logout = () => this.setState({ isLoggedIn: false })
    this.changeLang = lang => {
      document.querySelector('html').lang = lang
      this.setState({ lang })
    }
  }
  render() {
    return (
      <App
        isLoggedIn={this.state.isLoggedIn}
        login={this.login}
        logout={this.logout}
        lang={this.state.lang}
        changeLang={this.changeLang}
        dishes={this.state.dishes}
        orders={this.state.orders}
        isAdmin={this.state.isAdmin}
      />
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('root'))
