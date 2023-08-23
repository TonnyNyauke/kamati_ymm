package com.example.kamatiymm;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import org.w3c.dom.Text;

import java.util.HashMap;

public class RegisterActivity extends AppCompatActivity {
    private Spinner countyRegister;
    private TextView haveAnAccount, userName, emailAddress, registerPhoneNumber, registerPassword;
    private Button registerButton;
    String county;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        countyRegister = findViewById(R.id.register_county);
      countyRegister.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
          @Override
          public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
              county = parent.getItemAtPosition(position).toString();
          }

          @Override
          public void onNothingSelected(AdapterView<?> parent) {


          }
      });

        userName = findViewById(R.id.register_username);
        registerPhoneNumber = findViewById(R.id.register_phone_number);
        emailAddress = findViewById(R.id.register_email);
        haveAnAccount = findViewById(R.id.back_to_login);
        registerPassword = findViewById(R.id.register_password);
        registerButton = findViewById(R.id.register_btn);

        //Code for the dropdown for counties
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this, R.array.County, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        countyRegister.setAdapter(adapter);
        //Redirect back to login if user has an account
        haveAnAccount.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(RegisterActivity.this, MainActivity.class);
                startActivity(intent);
            }
        });
        registerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                createAccount();
            }
        });

    }

    private void createAccount() {
        String username = userName.getText().toString();
        String phone = registerPhoneNumber.getText().toString();
        String email = emailAddress.getText().toString();
        String countySelected = county;
        String password = registerPassword.getText().toString();

        if (TextUtils.isEmpty(username) || TextUtils.isEmpty(phone) || TextUtils.isEmpty(email) || TextUtils.isEmpty(password)){
            Toast.makeText(RegisterActivity.this, "Please fill all the fields",Toast.LENGTH_SHORT).show();

        } else if (countySelected == null) {
            Toast.makeText(RegisterActivity.this, "You have not selected any county",Toast.LENGTH_SHORT).show();

        }
        else {
            validatePhoneNumber(username, phone, email, countySelected, password);
        }

    }

    private void validatePhoneNumber(String username, String phone, String email, String countySelected, String password) {
        final DatabaseReference rootRefernce = FirebaseDatabase.getInstance().getReference();
        rootRefernce.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (!snapshot.child("Users").child(phone).exists()){
                    HashMap<String, Object> userData = new HashMap<>();
                    userData.put("username", username);
                    userData.put("phone", phone);
                    userData.put("email", email);
                    userData.put("county", countySelected);
                    userData.put("password", password);

                    rootRefernce.child("Users").child(phone).updateChildren(userData)
                            .addOnCompleteListener(new OnCompleteListener<Void>() {
                                @Override
                                public void onComplete(@NonNull Task<Void> task) {
                                    if (task.isSuccessful()){
                                        Toast.makeText(RegisterActivity.this, "Register successfully. You can login", Toast.LENGTH_SHORT).show();
                                        Intent intent = new Intent(RegisterActivity.this, MainActivity.class);
                                        startActivity(intent);
                                    }
                                    else {
                                        Toast.makeText(RegisterActivity.this, "Error creating an account. Please try again", Toast.LENGTH_SHORT).show();
                                    }
                                }
                            });

                }
                else {
                    Toast.makeText(RegisterActivity.this, "Phone number is already registered.", Toast.LENGTH_SHORT).show();

                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
    }
}