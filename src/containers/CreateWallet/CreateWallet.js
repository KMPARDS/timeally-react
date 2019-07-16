// this component can be split in multiple routes like LoadWallet
// not doing while converting from next js project because this is not priority.
// create wallet will be removed in future from BetDeEx
import React, { Component } from 'react';
import { Card, Form, Button, ProgressBar, Alert, Row, Col, Spinner } from 'react-bootstrap';
import CompleteModal from './CompleteModal';

const bip39 = require('bip39');
const ethereumjs = require('ethereumjs-wallet');
const hdkey = require('ethereumjs-wallet/hdkey');
const ethers = require('ethers');



class CreateWalletPage extends Component {
  state = {
    password1: '',
    password2: '',
    doPasswordsMatch: false,
    passwordIssueOnSubmit: false,
    progressBarColor: 'danger',
    progressBarValue: 0,
    mnemonicGenerateSpinner: false,
    currentScreen: 0,
    mnemonic: '',
    mnemonicArray: [],
    userEnteredmnemonic: [],
    isUsermnemonicCorrect: false,
    keystoreSpinner: false,
    keystore: {},
    keystoreFileName: '',
    userDownloadedKeystore: false
  };

  updatepassword1 = event => {
    console.log(event.target.value)
    this.state.password1 = event.target.value;

    //console.log(this.state.password1, this.state.password1.length / 15 * 100);

    this.setState({ progressBarValue: (this.state.password1.length < 15) ?  this.state.password1.length / 15 * 100 : 100 });

    if (this.state.password1.length < 10) this.setState({ progressBarColor: 'danger' })
    else if (this.state.password1.length < 14) this.setState({ progressBarColor: 'warning' })
    else this.setState({ progressBarColor: 'success' })
  };

  updatepassword2 = async event => {
    await this.setState({ password2: event.target.value });
    this.setState({ doPasswordsMatch: this.state.password1 === this.state.password2 });
  };

  // from first screen to second screen
  submitPassword = async event => {
    if(this.state.password1.length && this.state.password1 === this.state.password2) {
      // generate a mnemonic and store it and display it
      await this.setState({ mnemonicGenerateSpinner: true });
      setTimeout(()=>{
        this.setState({
          mnemonic: bip39.generateMnemonic(128),
          mnemonicGenerateSpinner: false,
          currentScreen: 1
        });
      }, 500);
    } else {
      // show that you can generate only after
      this.setState({ passwordIssueOnSubmit: true });
    }
  };

  // go back screen
  goBackScreen = event => {
    this.setState({ currentScreen: this.state.currentScreen - 1 })
  }

  // from second screen to third screen
  showEntermnemonicScreen = event => {
    const memArray = [];

    this.state.mnemonic.split(' ').forEach((word, index) => {
      memArray.push({
        word,
        isSelected: false
      });
    });

    // this is for un ordering the mnemonic so that user will have to put it in currect order
    for(let i = 0; i < 20; i++) {
      const first = Math.floor(Math.random() * 1000 + 1000)%memArray.length;
      const second = Math.floor(Math.random() * 1000 + 1000)%memArray.length;
      const temp = memArray[first];
      memArray[first] = memArray[second];
      memArray[second] = temp;
    }

    this.setState({
      currentScreen: 2,
      mnemonicArray: memArray
    });
  };

  renderButtons = () => {
    const cardArray = [];
    this.state.mnemonicArray.forEach((object, index) => {
      //console.log(object);
      cardArray.push(<Button style={{backgroundColor: object.isSelected ? '#0000' : '#0001'}} variant="light" id={`mem-${index}`} key={index} onClick={this.clickOnWord}>{object.word}</Button>);
    });
    return cardArray;
  };

  clickOnWord = event => {
    const index = event.currentTarget.id.split('-')[1];
    const mnemonicArray = this.state.mnemonicArray;
    const userEnteredmnemonic = this.state.userEnteredmnemonic;
    if(userEnteredmnemonic.indexOf(index) > -1) {
      userEnteredmnemonic.splice(userEnteredmnemonic.indexOf(index),1);
    } else {
      userEnteredmnemonic.push(index);
    }
    mnemonicArray[index].isSelected = !mnemonicArray[index].isSelected;

    let isUsermnemonicCorrect = false;
    if(this.state.mnemonic === this.state.userEnteredmnemonic.map(memNumber => this.state.mnemonicArray[memNumber].word).join(' ')) {
      isUsermnemonicCorrect = true;
    }

    this.setState({
      userEnteredmnemonic,
      mnemonicArray,
      isUsermnemonicCorrect
    });
    //console.log(event.currentTarget.id.split('-')[1]);
  };

  // from third screen to fourth screen
  showKeystoreScreen = async () => {
    await this.setState({
      currentScreen: 3,
      keystoreSpinner: true
    });
    const seed = await bip39.mnemonicToSeed(this.state.mnemonic); //Buffer
    const hdWallet = hdkey.fromMasterSeed(seed);
    const firstPrivateKey = hdWallet.derivePath("m/44'/60'/0'/0/0")._hdkey._privateKey;
    // const hdWalletInstance = hdWallet.getWallet();
    const firstWallet = ethereumjs.fromPrivateKey(firstPrivateKey);
    console.log('address from ethereum js',firstWallet.getAddress().toString('hex'));

    const ethersWallet = new ethers.Wallet(firstPrivateKey, new ethers.providers.InfuraProvider('rinkeby'));
    console.log('address from ethers js', await ethersWallet.getAddress());
    //const firstWallet = hdWallet.derivePath("m/44'/60'/0'/0/0").getWallet();
    const keystore = firstWallet.toV3(this.state.password1);
    const keystoreFileName = firstWallet.getV3Filename(new Date().getTime());
    this.state.keystore = keystore;
    this.state.keystoreFileName = keystoreFileName;
    this.setState({ keystoreSpinner: false });
  };

  downloadKeystore = () => {
    //console.log('keystore', keystore);
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(this.state.keystore)], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = this.state.keystoreFileName; //"keystore.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    this.setState({ keystoreSpinner: false, userDownloadedKeystore: true });
  }

  modalClose = () => this.setState({ userDownloadedKeystore: false });

  render() {

    return (
      <div>
        <Card>
          <Card.Body align="center">
            <Row>
              <Col style={{textAlign: 'left'}}>
                <Button variant="secondary" style={{display: this.state.currentScreen === 0 ? 'none' : 'inline'}} onClick={this.goBackScreen}>Back</Button>
              </Col>
              <Col><h4>Create Wallet</h4></Col>
              <Col></Col>
            </Row>

            <Card style={{margin: '15px 0', maxWidth: '300px', display: this.state.currentScreen === 0 ? 'block' : 'none'}}>
              <Card.Body align="center">
                <Form>
                  <Form.Group controlId="password1">
                    <Form.Control isValid={this.state.doPasswordsMatch} isInvalid={this.state.password2 && !this.state.doPasswordsMatch} onKeyUp={this.updatepassword1} required type="password" placeholder="Create a strong password" />
                  </Form.Group>
                  <Form.Group controlId="password2">
                    <Form.Control isValid={this.state.doPasswordsMatch} isInvalid={this.state.password2 && !this.state.doPasswordsMatch} onKeyUp={this.updatepassword2} required type="password" placeholder="Confirm password" />
                  </Form.Group>
                  <ProgressBar variant={this.state.progressBarColor} now={this.state.progressBarValue} />
                  <Alert variant="danger" style={{marginTop: '15px', marginBottom: '0', display: this.state.passwordIssueOnSubmit ? 'block' : 'none'}}>
                    You need to enter and confirm password before generating a mnemonic
                  </Alert>
                  <Button onClick={this.submitPassword} style={{marginTop: '15px'}}>
                  <Spinner style={{display: this.state.mnemonicGenerateSpinner ? 'inline-block' : 'none', marginRight: '2px'}}
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {this.state.mnemonicGenerateSpinner ? 'Generating mnemonic...' : 'Generate mnemonic'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <Card style={{margin: '15px 0', maxWidth: '400px', display: this.state.currentScreen === 1 ? 'block' : 'none'}}>
              <Card.Body align="center">
                <p>Please write this down in a safe place</p>
                <p style={{fontWeight: '700'}}>{this.state.mnemonic}</p>
                <Button onClick={this.showEntermnemonicScreen} style={{marginTop: '15px'}}>I wrote it down, Next</Button>
              </Card.Body>
            </Card>

            <Card style={{margin: '15px 0', maxWidth: '400px', display: this.state.currentScreen === 2 ? 'block' : 'none'}}>
              <Card.Body align="center">
                <p>Please enter your mnemonic in order</p>
                <Card style={{
                  marginBottom: '15px',
                  minHeight: '120px',
                  border: this.state.isUsermnemonicCorrect ? '1px solid #0f08' : '1px solid rgba(0,0,0,.125)',
                  backgroundColor: this.state.isUsermnemonicCorrect ? '#0f02' : '#0000'
                }}>
                  <Card.Body align="center">
                    {this.state.userEnteredmnemonic.map(memNumber => this.state.mnemonicArray[memNumber].word).join(' ')}
                  </Card.Body>
                </Card>
                {this.renderButtons()}
                <br />
                <Button onClick={this.showKeystoreScreen} style={{marginTop: '15px'}} disabled={!this.state.isUsermnemonicCorrect}>{this.state.isUsermnemonicCorrect ? 'Next step' : 'Verify Mnemonic'}</Button>
              </Card.Body>
            </Card>

            <Card style={{margin: '15px 0', display: this.state.currentScreen === 3 ? 'block' : 'none'}}>
              <Card.Body style={{textAlign: 'left'}}>
                <h4 style={{textAlign: 'center'}}>Keystore file</h4>
                <ol>
                  <li>A keystore file contains the password encrypted version of your private key. Generation process takes your private key through AES-128-CTR and KDF-SCRIPT encryption algorithms. <u>It can take from 20 seconds to over a minute depending on your computer to encrypt your private key.</u> After some time if your browser prompts that web page is not responding, <u>then please click on wait.</u></li>
                  <li>To spend the cryptocurrencies in your wallet, you need to have your keystore file as well as your password.</li>
                  <li>If you misplaced your keystore file or forgot your password or both, then you will not be able to spend your funds.</li>
                  <li>Then only way to unlock your funds is your mnemonic phrase. So keep it super safe.</li>
                </ol>
                <Card style={{fontWeight: '700', textAlign: 'center', backgroundColor: '#0001', maxWidth: '400px', margin: '0 auto', padding: '20px'}}>{this.state.mnemonic}</Card>
                <Button style={{display: 'block', textAlign:'center', margin: '10px auto'}} disabled={this.state.keystoreSpinner} onClick={this.downloadKeystore}>
                  <Spinner style={{display: this.state.keystoreSpinner ? 'inline-block' : 'none', marginRight: '2px'}}
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  {this.state.keystoreSpinner ? 'Generating your keystore file' : 'Download your Keystore file'}
                </Button>
              </Card.Body>
            </Card>

          </Card.Body>
        </Card>
        <CompleteModal
          show={this.state.userDownloadedKeystore}
          onHide={this.modalClose}
        />
      </div>
    );
  }
}

export default CreateWalletPage;
