import React, { Component } from 'react';
import { 
  Input, 
  Heading,
  Button,
} from 'rebass';
import { Container, Row, Col } from 'react-grid-system';

class AddTeamAction extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            goal: '',
            userActive: false,
            activeClass: 'hidden'
        }
    }
    hideOrShowActionForm() {
        const {userActive} = this.state;

        if (userActive && !!this.tid) {
            window.clearTimeout(this.tid);
        }
        else {
            this.setState({
                userActive: true,
                activeClass: ''
            });
        }
        this.tid = setTimeout(() => {
            if (this.tid) {
                this.setState({
                    userActive: false,
                    activeClass: 'hidden'
                });
                window.clearTimeout(this.tid);
            }
        }, 2000);            
    }

    componentDidMount() {
        window.addEventListener('mousemove', this.hideOrShowActionForm.bind(this));
        window.addEventListener('keyup', this.hideOrShowActionForm.bind(this));
    }

    componentWillUnmount() {
        window.clearTimeout(this.tid);

        window.removeEventListener('mousemove', this.hideOrShowActionForm);
        window.removeEventListener('keyup', this.hideOrShowActionForm);
    }

    onAddAction() {
        this.props.addItem({...this.state});
        this.setState({
            name: '',
            goal: ''
        });
    }

    render() {
        const { activeClass } = this.state;

        return (
            <Container>
                <Row>
                    <Col lg={4}>
                        <div className={`add-action-container ${activeClass}`}>
                            <Heading style={{ paddingTop: '32px'}} level={2}>
                                Add Action:
                            </Heading>
                            <Input
                            label="Name"
                            name="input_example"
                            value={this.state.name}
                            placeholder="ex. Send dev to trade show..."
                            onChange={(event) => this.setState({
                                name: event.target.value
                            }) 
                            }
                            rounded
                            type="text"
                            />
                            <Input
                            label="Goal/Outcome"
                            name="input_example"
                            onChange={(event) => this.setState({
                                goal: event.target.value
                            }) 
                            }
                            value={this.state.goal}
                            placeholder="Gain a better working knowledge of..."
                            rounded
                            type="text"
                            />
                            <Button
                            backgroundColor="primary"
                            color="white"
                            inverted
                            rounded
                            onClick={this.onAddAction.bind(this)}>
                                Add Team Goal 
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default AddTeamAction;