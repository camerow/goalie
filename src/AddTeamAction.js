import React, { Component } from 'react';
import { 
  Input, 
  Heading,
  Container as RContainer,
  Button,
  PageHeader,
  Panel,
  PanelHeader,
  Text
} from 'rebass';

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

    componentDidMount() {
        const hideOrShowActionForm = () => {
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
                    })
                }
            }, 2000);            
        };

        window.addEventListener('mousemove', hideOrShowActionForm);
        window.addEventListener('keyup', hideOrShowActionForm);
    }

    componentWillUnmount() {
        // window.removeEventListener('mousemove');
        // window.removeEventListener('keyup');
    }

    onAddAction() {
        this.props.addItem({...this.state});
    }

    render() {
        const { activeClass } = this.state;

        return (
            <div className={`add-action-container ${activeClass}`}>
                <Heading level={2}>
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
        );
    }
}

export default AddTeamAction;