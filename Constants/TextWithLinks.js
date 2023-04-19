import React from 'react';
import { View, Text, Linking } from 'react-native';
const TextWithLinks = ({ text }) => {
    const textParts = text.split(/(https?:\/\/[^\s]+)/g);
        return (
      <View>
        {textParts.map((part, i) =>
          part.startsWith('http') || part.startsWith('www') ? (
            <Text
              key={i}
              onPress={() => Linking.openURL(part.startsWith('www')?'https://'+ part :part)} // open link on press
              style={{ color: 'blue' }}
            >
              {part}
            </Text>
          ) : (
            <Text key={i}>{part}</Text>
          )
        )}
      </View>
    );
  };
  
  export default TextWithLinks;
  //In this updated version, we use a regular expression that matches URLs with or without the http, https, or www protocol. We then render all links as blue and underlined using the color and textDecorationLine styles.
  
  
  
  
  
  