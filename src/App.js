import React from 'react';
import axios from 'axios';
import './reset.css' 
import './App.css';
import Header from './components/Header';
import Feed from './components/Feed'
import Form from './components/Form'

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      journal: [],
      formVisible: false
    }
    this.createEntry = this.createEntry.bind(this)
  }
  
  toggleForm = () => {
    this.setState({
      menuVisible: !this.state.menuVisible
    })
  }

  componentDidMount(){
    this.getJournal();
  };

  getJournal = () => {
    axios.get('/api/journal')
      .then( res => {
        this.setState({
          journal: res.data
        })
      }
    ).catch( err => console.log(err))
  }

  createEntry = (e, entry) => {
    e.preventDefault()
    axios.post('/api/journal', {entry})
      .then( res => {
        this.setState({
          journal: res.data
        })
      })
  }

  deleteEntry = (id) => {
    axios.delete(`/api/journal/${id}`)
    .then(res => {
      this.setState({
        journal: res.data
      })
    }).catch( err => console.log(err))
  }

  render(){
    console.log(this.state)
    return(
      <div>
        <div>
          <Header/>
        </div>
        <div>
          <Feed journal={this.state.journal} deleteEntry={this.deleteEntry}/>
        </div>
        <div onClick={(e) => this.toggleForm(e)} className="new-entry-btn">NEW ENTRY</div>
        { this.state.formVisible ? (
          <div className="form-container">
            <Form createEntry={this.createEntry}/>
          </div>
        )  : null } 
      </div>
    );
  }
}

export default App;
