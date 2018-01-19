package com.jacksonextentions;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class NumericBooleanSerializer extends JsonSerializer<Object>{

    @Override
    public void serialize(Object arg0, JsonGenerator arg1, SerializerProvider arg2) throws IOException, JsonProcessingException {
        if(arg0 instanceof Integer){
            arg1.writeBoolean((Integer)arg0==1 ? true : false);
        }
      
    }
}
