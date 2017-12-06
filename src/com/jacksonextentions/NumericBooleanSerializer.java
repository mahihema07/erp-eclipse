package com.jacksonextentions;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class NumericBooleanSerializer extends JsonSerializer<Integer>{

    @Override
    public void serialize(Integer arg0, JsonGenerator arg1, SerializerProvider arg2) throws IOException, JsonProcessingException {
      arg1.writeBoolean(arg0==1 ? true : false);
    }
}
