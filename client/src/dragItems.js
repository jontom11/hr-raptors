import React from "react";
module.exports = {
  button: <a className="waves-effect waves-light btn-large">Button</a>,
  floatingButton: <a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">add</i></a>,
  pulse: <a className="btn btn-floating btn-large pulse"><i className="material-icons">cloud</i></a>,
  rowCol2: 'col2',
  rowCol3: 'col3',
  rowCol4: 'col4',
  rowCol6: 'col6',
  rowCol12: 'col12',
  footer:
    <footer className="page-footer">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Footer Content</h5>
            <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text">Links</h5>
            <ul>
              <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
              <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
              <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
              <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          © 2014 Copyright Text
          <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
        </div>
      </div>
    </footer>,
  card:
    <div className="row">
      <div className="col s12 m6">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Card Title</span>
            <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
          </div>
          <div className="card-action">
            <a href="#">This is a link</a>
            <a href="#">This is a link</a>
          </div>
        </div>
      </div>
    </div>,
  imageCard:
    <div className="row">
      <div className="col s12 m7">
        <div className="card">
          <div className="card-image">
            <img src="http://i.dailymail.co.uk/i/pix/2015/09/10/20/2C24A6F100000578-0-image-m-41_1441911642266.jpg" />
              <span className="card-title">Card Title</span>
          </div>
          <div className="card-content">
            <p>I am a very simple card. I am good at containing small bits of information.
              I am convenient because I require little markup to use effectively.</p>
          </div>
          <div className="card-action">
            <a href="#">This is a link</a>
          </div>
        </div>
      </div>
    </div>,
  h1:
    <h1>Header 1</h1>,
  h2:
    <h2>Header 2</h2>,
  h3:
    <h3>Header 3</h3>,
  h4:
    <h4>Header 4</h4>,
  h5:
    <h5>Header 5</h5>,
  h6:
    <h6>Header 6</h6>,
  strong:
    <strong>Very Important</strong>,
  emphasis:
    <em>Important information</em>,
  bold:
    <b>Bloody, bold, and resolute</b>,
  paragraph:
    <p>This is a paragraph.</p>,
  blockquote:
    <blockquote>“Far out in the uncharted backwaters of the unfashionable end of the western spiral arm of the
      Galaxy lies a small unregarded yellow sun. Orbiting this at a distance of roughly ninety-two million
      miles is an utterly insignificant little blue green planet whose ape-descended life forms are so
      amazingly primitive that they still think digital watches are a pretty neat idea.”</blockquote>,
  image:
    <div>
      <img className="responsive-img" src="http://i.dailymail.co.uk/i/pix/2015/09/10/20/2C24A6ED00000578-0-image-m-56_1441912374479.jpg" />
    </div>,
  embeddedVideo:
    <div className="video-container">
      <iframe width="453" height="280" src="//www.youtube.com/embed/Q8TXgCzxEnw?rel=0" frameBorder="0" allowfullscreen></iframe>
    </div>,
  responsiveVideo:
    <video className="responsive-video" controls>
      <source src="./assets/bigbuckbunny.mp4" type="video/mp4" />
    </video>,
  collection:
    <div className="collection">
      <a href="#!" className="collection-item">Alvin</a>
      <a href="#!" className="collection-item active">Alvin</a>
      <a href="#!" className="collection-item">Alvin</a>
      <a href="#!" className="collection-item">Alvin</a>
    </div>,
  pagination:
    <ul className="pagination">
      <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
      <li className="active"><a href="#!">1</a></li>
      <li className="waves-effect"><a href="#!">2</a></li>
      <li className="waves-effect"><a href="#!">3</a></li>
      <li className="waves-effect"><a href="#!">4</a></li>
      <li className="waves-effect"><a href="#!">5</a></li>
      <li className="waves-effect"><a href="#!"><i className="material-icons">chevron_right</i></a></li>
    </ul>,
  preloader:
    <div className="progress">
      <div className="indeterminate"></div>
    </div>,
  circularPreloader:
    <div className="preloader-wrapper big active">
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div><div className="gap-patch">
        <div className="circle"></div>
      </div><div className="circle-clipper right">
        <div className="circle"></div>
      </div>
      </div>
    </div>,
  form:
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <input placeholder="Placeholder" id="first_name" type="text" className="validate" />
            <label for="first_name">First Name</label>
          </div>
          <div className="input-field col s6">
            <input id="last_name" type="text" className="validate" />
            <label for="last_name">Last Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input disabled value="I am not editable" id="disabled" type="text" className="validate" />
            <label for="disabled">Disabled</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="password" type="password" className="validate" />
            <label for="password">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input id="email" type="email" className="validate" />
            <label for="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            This is an inline input field:
            <div className="input-field inline">
              <input id="email" type="email" className="validate" />
              <label for="email" data-error="wrong" data-success="right">Email</label>
            </div>
          </div>
        </div>
      </form>
    </div>,
  simpleForm:
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <i className="material-icons prefix">account_circle</i>
            <input id="icon_prefix" type="text" className="validate" />
              <label for="icon_prefix">First Name</label>
          </div>
          <div className="input-field col s6">
            <i className="material-icons prefix">phone</i>
            <input id="icon_telephone" type="tel" className="validate" />
              <label for="icon_telephone">Telephone</label>
          </div>
        </div>
      </form>
    </div>,
  icon: <i className="material-icons">add</i>,
  navbar:
    <nav>
      <div className="nav-wrapper">
        <a href="#" className="brand-logo">Logo</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><a href="sass.html">Sass</a></li>
          <li><a href="badges.html">Components</a></li>
          <li><a href="collapsible.html">JavaScript</a></li>
        </ul>
      </div>
    </nav>,
  breadCrumbs:
    <nav>
      <div className="nav-wrapper">
        <div className="col s12">
          <a href="#!" className="breadcrumb">First</a>
          <a href="#!" className="breadcrumb">Second</a>
          <a href="#!" className="breadcrumb">Third</a>
        </div>
      </div>
    </nav>,
  table:
    <table>
      <thead>
      <tr>
        <th>Column A</th>
        <th>Column B</th>
        <th>Column C</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
      </tr>
      <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
      </tr>
      <tr>
        <td>Data</td>
        <td>Data</td>
        <td>Data</td>
      </tr>
      </tbody>
    </table>,
};
