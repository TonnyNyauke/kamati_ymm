package com.example.adminpanel;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

public class HomeActivity extends AppCompatActivity {
    private ImageView activatedCharcoal, dandelion, hibiscus, moringa;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        activatedCharcoal = findViewById(R.id.activated_charcoal_add);
        dandelion = findViewById(R.id.dandelion_add);
        hibiscus = findViewById(R.id.hibiscus_add);
        moringa = findViewById(R.id.moringa_add);

        activatedCharcoal.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(HomeActivity.this, AdminAddNewProductActivity.class);
                intent.putExtra("Category", "Activated Charcoal");
                startActivity(intent);
            }
        });
        dandelion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(HomeActivity.this, AdminAddNewProductActivity.class);
                intent.putExtra("Category", "Dandelion");
                startActivity(intent);
            }
        });
        hibiscus.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(HomeActivity.this, AdminAddNewProductActivity.class);
                intent.putExtra("Category", "Hibiscus");
                startActivity(intent);
            }
        });
        moringa.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(HomeActivity.this, AdminAddNewProductActivity.class);
                intent.putExtra("Category", "Moringa");
                startActivity(intent);
            }
        });
    }
}