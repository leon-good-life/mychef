import React from 'react'
import { Link } from 'react-router-dom'
import translateComponent from '../../utils/translateComponent'
import { uploadDishImage } from '../../store/ajax/dishes'
import LoadingImg from '../loading.gif'

const translations = {
  en: {
    name: 'Name',
    description: 'Description',
    image: 'Image',
    price: 'Price',
    h1Add: 'Add new dish',
    h1Edit: 'Edit dish',
    update: 'Update',
    add: 'Add',
    cancel: 'Cancel'
  },
  he: {
    name: 'שם המנה',
    description: 'תיאור',
    image: 'העלה תמונה',
    price: 'מחיר',
    h1Add: 'הוסף מנה חדשה',
    h1Edit: 'עדכן מנה',
    update: 'עדכן',
    add: 'הוסף',
    cancel: 'בטל'
  }
}

class DishForm extends React.Component {
  constructor(props) {
    super(props)
    let name, description, image, price
    if (this.props.dish) {
      // todo: use es6 for this. I tried but it failed to compile.
      name = this.props.dish.name
      description = this.props.dish.description
      image = this.props.dish.image
      price = this.props.dish.price
    } else {
      name = ''
      description = ''
      image = ''
      price = ''
    }
    this.state = {
      name,
      description,
      image,
      price,
      isUploading: false,
      progress: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleImgSelect = this.handleImgSelect.bind(this)
  }
  render() {
    return (
      <div className="card">
        <form className="card-body" onSubmit={this.handleSubmit}>
          <h1>
            {this.props.type === 'add'
              ? this.props.translated.h1Add
              : this.props.translated.h1Edit}
          </h1>
          <div className="form-row">
            <div className="col">
              <div className="form-group">
                <label>{this.props.translated.name}</label>
                <input
                  className="form-control"
                  placeholder={this.props.translated.name}
                  required
                  value={this.state.name}
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>{this.props.translated.description}</label>
                <textarea
                  className="form-control"
                  placeholder={this.props.translated.description}
                  required
                  value={this.state.description}
                  onChange={e => this.setState({ description: e.target.value })}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="col">
                <div className="form-group">
                  <label>{this.props.translated.price}</label>

                  <div className="input-group">
                    <input
                      className="form-control"
                      placeholder={this.props.translated.price}
                      type="number"
                      required
                      value={this.state.price}
                      onChange={e =>
                        this.setState({ price: parseInt(e.target.value) })
                      }
                    />
                    <span className="input-group-btn">
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={e =>
                          this.setState(prevState => ({
                            price: prevState.price + 1
                          }))
                        }
                      >
                        &#9650;
                      </button>
                      <button
                        className="btn btn-secondary"
                        type="button"
                        onClick={e =>
                          this.setState(prevState => ({
                            price: prevState.price - 1
                          }))
                        }
                      >
                        &#9660;
                      </button>
                    </span>
                  </div>
                </div>
                <div className="form-group" dir="ltr" lang="en">
                  <label>{this.props.translated.image}</label>
                  <label className="custom-file form-control">
                    <input
                      type="file"
                      onChange={this.handleImgSelect}
                      className="custom-file-input"
                    />
                    <span className="custom-file-control" />
                  </label>
                  {this.state.isUploading && (
                    <div className="progress mt-2">
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: this.state.progress + '%' }}
                      />
                    </div>
                  )}
                  {this.state.isUploading &&
                    !this.state.image && (
                      <img
                        src={location.origin + '/public/' + LoadingImg}
                        alt="Loading..."
                        style={{ height: 50 }}
                      />
                    )}
                  {!!this.state.image && (
                    <img
                      className="m-1"
                      src={this.state.image}
                      style={{ height: 150 }}
                      alt="dish image"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-primary m-1" type="submit">
            {this.props.type === 'add'
              ? this.props.translated.add
              : this.props.translated.update}
          </button>
          <Link to="/cook/dishes" className="btn btn-secondary m-1">
            {this.props.translated.cancel}
          </Link>
        </form>
      </div>
    )
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.submit({
      name: this.state.name,
      price: this.state.price,
      description: this.state.description,
      image: this.state.image
    })
  }
  handleImgSelect(e) {
    const formData = new FormData()
    const file = e.target.files[0]
    formData.append('file', file)
    uploadDishImage(
      formData,
      this.props.token,
      progress => {
        this.setState({
          isUploading: true,
          progress
        })
      },
      imgUrl => {
        this.setState({ image: imgUrl, isUploading: false })
      },
      err => {
        console.log(err)
      }
    )
  }
}

export default translateComponent(DishForm, translations)
