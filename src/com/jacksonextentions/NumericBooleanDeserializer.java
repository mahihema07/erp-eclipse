package com.jacksonextentions;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

public class NumericBooleanDeserializer extends JsonDeserializer<Integer>{

    @Override
    public Integer deserialize(JsonParser parser, DeserializationContext arg1) throws IOException, JsonProcessingException {
        if(parser.getText().equals("true") || parser.getText().equals("TRUE")){
            return 1;
        }else{
            return 0;
        }

    }
}
