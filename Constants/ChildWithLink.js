import React from 'react';
import { Linking, Pressable } from 'react-native';

const ChildWithLink = props => {
   
  return (
    <Pressable onPress={() =>{
      Linking.openURL(props.link)
      console.log("djfbcjdkhfouj")
    }} style={{
    
    }}  >
      {
        props.children
      }
    </Pressable>
  );
};

export default ChildWithLink;
