package com.example.kamatiymm;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.example.kamatiymm.onlineusers.OnlineUser;
import com.example.kamatiymm.users.Users;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.rey.material.widget.CheckBox;

import io.paperdb.Paper;

public class MainActivity extends AppCompatActivity {
    private Button loginButton;
    private TextView signUpLink, loginNumber, loginPassowrd;
    private String parentDbName = "Users";
    private CheckBox rememberMe;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        loginButton  = findViewById(R.id.login_btn);
        signUpLink = findViewById(R.id.signup);
        loginNumber = findViewById(R.id.login_phone_number);
        loginPassowrd = findViewById(R.id.login_password);

        //Initialize remember me
        rememberMe = findViewById(R.id.remember_me);
        Paper.init(this);
        //Get login information from OnlineUser class for remember me
        String userPhoneKey = Paper.book().read(OnlineUser.userPhoneKey);
        String userPassword = Paper.book().read(OnlineUser.userPasswordKey);

        //Check credentials
        if (userPhoneKey != "" && userPassword != ""){
            if (!TextUtils.isEmpty(userPhoneKey) && !TextUtils.isEmpty(userPassword)){
                allowAccessToAccount(userPhoneKey, userPassword);
            }
        }


        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String phone = loginNumber.getText().toString();
                String password = loginPassowrd.getText().toString();

                if (TextUtils.isEmpty(phone)){
                    Toast.makeText(MainActivity.this, "Phone field cannot be empty", Toast.LENGTH_SHORT).show();

                } else if (TextUtils.isEmpty(password)) {
                    Toast.makeText(MainActivity.this, "Password field cannot be empty", Toast.LENGTH_SHORT).show();

                }
                else {
                    allowUserLogin(phone, password);
                }

            }
        });
        signUpLink.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, RegisterActivity.class);
                startActivity(intent);
            }
        });
    }

    private void allowUserLogin(String phone, String password) {
        //Write to the OnlineUser class if the checkbox is checked.
        //Store user information in the OnlineUser class
        if (rememberMe.isChecked()){
            Paper.book().write(OnlineUser.userPhoneKey, phone);
            Paper.book().write(OnlineUser.userPasswordKey, password);
        }

        DatabaseReference rootReference = FirebaseDatabase.getInstance().getReference();
        rootReference.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.child(parentDbName).child(phone).exists()){
                    //Taking information from database and putting them in Users class
                    Users userData = snapshot.child(parentDbName).child(phone).getValue(Users.class);
                    //If phone number and password entered matches the one in the database
                    if (userData.getPhone().equals(phone)){
                        if (userData.getPassword().equals(password)){
                        Intent intent = new Intent(MainActivity.this, HomeActivity.class);
                        OnlineUser.currentOnlineUsers = userData;//Used to get names once.
                        startActivity(intent);
                        }
                    }
                }
                else {
                        Toast.makeText(MainActivity.this, "Wrong credentials", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });




    }


    //Allows access to Home page if user checked the checkbox
    private void allowAccessToAccount(final String phone, final String password) {
        DatabaseReference rootReference = FirebaseDatabase.getInstance().getReference();
        rootReference.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.child("Users").child(phone).exists()){
                    //Taking information from database and putting them in Users class
                    Users userData = snapshot.child("Users").child(phone).getValue(Users.class);
                    //If phone number and password entered matches the one in the database
                    if (userData.getPhone().equals(phone)){
                        if (userData.getPassword().equals(password)){
                            Intent intent = new Intent(MainActivity.this, HomeActivity.class);
                            startActivity(intent);
                        }
                    }
                }
                else {
                    Toast.makeText(MainActivity.this, "Wrong credential", Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });

    }
}