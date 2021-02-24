package com.icewarp.meet.sdk;

import android.content.Context;
import android.widget.Toast;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;


@ReactModule(name = IcewarpCallbackModule.NAME)
class IcewarpCallbackModule extends ReactContextBaseJavaModule {

    public static final String NAME = "IcewarpCallback";

    public IcewarpCallbackModule(ReactApplicationContext context) {
        super(context);
    }

    @ReactMethod
    public void onInvite() {
        //----- implementation start here -----
        Context context = getReactApplicationContext();
        Toast toast = Toast.makeText(context, "onInvite", Toast.LENGTH_LONG);
        toast.show();
        //----- implementation ends here -----
    }

    @ReactMethod
    public void onEnterPipMode(Promise promise) {
        try {
            //----- implementation start here -----
            Context context = getReactApplicationContext();
            Toast toast = Toast.makeText(context, "onEnterPipMode", Toast.LENGTH_LONG);
            toast.show();
            //----- implementation ends here -----

            promise.resolve(null);
        } catch (RuntimeException re) {
            promise.reject(re);
        }
    }

    @Override
    public String getName() {
        return NAME;
    }
}
