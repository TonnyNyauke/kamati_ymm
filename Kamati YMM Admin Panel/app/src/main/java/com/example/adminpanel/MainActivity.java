package com.example.adminpanel;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.adminpanel.admins.Admins;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class MainActivity extends AppCompatActivity {
    private EditText adminPhoneNumber, adminPassword;
    private Button adminLoginButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        adminPhoneNumber = findViewById(R.id.admin_phone_number);
        adminPassword = findViewById(R.id.admin_password);
        adminLoginButton = findViewById(R.id.admin_login);

        adminLoginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String adminPhone = adminPhoneNumber.getText().toString();
                String password = adminPassword.getText().toString();

                if (TextUtils.isEmpty(adminPhone)){
                    Toast.makeText(MainActivity.this, "Phone Number field can't be empty", Toast.LENGTH_SHORT).show();
                } else if (TextUtils.isEmpty(password)) {
                    Toast.makeText(MainActivity.this, "Password field can't be empty", Toast.LENGTH_SHORT).show();

                }else{

                allowAdminToAccount(adminPhone, password);}
            }
        });

    }

    private void allowAdminToAccount(String phone, String password) {
        DatabaseReference rootReference = FirebaseDatabase.getInstance().getReference();
        rootReference.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                if (snapshot.child("Admins").child(phone).exists()){
                    Admins users = snapshot.child("Admins").child(phone).getValue(Admins.class);
                    if (users.getPhone().equals(phone)){
                        if (users.getPassword().equals(password)){
                            Intent intent = new Intent(MainActivity.this, HomeActivity.class);
                            startActivity(intent);
                        }
                    }
                }else {
                    Toast.makeText(MainActivity.this, "Wrong credential!", Toast.LENGTH_SHORT).show();
                }

            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
    }
}