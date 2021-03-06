import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMessages } from "../store/actions/messages";
import MessageItem from "../components/MessageItem";

class MessageList extends Component {
   componentDidMount() {
      this.props.fetchMessages();
   }
   render() {
      const { messages } = this.props;
      let messageList = messages.map(message => (
         <MessageItem
            key={message._id}
            date={message.createAt}
            text={message.text}
            username={message.user.username}
            avatar={message.user.avatar}
         />
      ));
      return (
         <div className="row col-sm-8">
            <div className="offset-1 col-sm-10">
               <ul className="list-group" id="messages">
                  {messageList}
               </ul>
            </div>
         </div>
      );
   }
}

const mapStateToProps = state => {
   return {
      messages: state.messages
   };
};

export default connect(mapStateToProps, { fetchMessages })(MessageList);
