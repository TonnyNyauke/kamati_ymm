package com.example.adminpanel;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.google.android.gms.tasks.Continuation;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;

public class AdminAddNewProductActivity extends AppCompatActivity {
    private String categoryName, name, description, price, saveCurrentDate, saveCurrentTime, productRandomKey,downloadImageUrl;
    private ImageView selectProductImage;
    private EditText productName, productDescription, productPrice;
    private Button addNewProductButton;
    private StorageReference productImagesRef;
    private DatabaseReference productsRef;
    private ActivityResultLauncher<Intent> galleryOpen;
    private Uri imageUri;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_admin_add_new_product);

        //Works on image gallery
        galleryOpen = registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), new ActivityResultCallback<ActivityResult>() {
            @Override
            public void onActivityResult(ActivityResult result) {
                if (result.getResultCode() == Activity.RESULT_OK){
                    Intent data = result.getData();
                    imageUri = data.getData();
                    selectProductImage.setImageURI(imageUri);
                }
            }
        });

        categoryName = getIntent().getExtras().get("Category").toString();
        //Initialize Firebase Storage reference.
        productImagesRef = FirebaseStorage.getInstance().getReference().child("Product Images");
        //Initialize Firebase Database reference.
        productsRef = FirebaseDatabase.getInstance().getReference().child("Products");

        selectProductImage = findViewById(R.id.select_product_image);
        productName = findViewById(R.id.product_name);
        productDescription = findViewById(R.id.product_description);
        productPrice = findViewById(R.id.product_price);
        addNewProductButton = findViewById(R.id.add_new_product_btn);
        
        selectProductImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openGallery();
            }
        });
        addNewProductButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                validateProductData();
            }
        });
    }

    private void validateProductData() {
        name = productName.getText().toString();
        description = productDescription.getText().toString();
        price = productPrice.getText().toString();

        if (TextUtils.isEmpty(name) || TextUtils.isEmpty(description) || TextUtils.isEmpty(price)){
            Toast.makeText(AdminAddNewProductActivity.this, "There is an empty field", Toast.LENGTH_SHORT).show();
        }
        else {
            storeProductInfo();
        }
    }

    private void storeProductInfo() {
        Calendar calendar = Calendar.getInstance();

        //Store date
        SimpleDateFormat currentDate =new SimpleDateFormat("MM dd, yyyy");
        saveCurrentDate = currentDate.format(calendar.getTime());
        //Store time info
        SimpleDateFormat currentTime = new SimpleDateFormat("HH:mm:ss a");
        saveCurrentTime = currentTime.format(calendar.getTime());

        productRandomKey = saveCurrentDate + saveCurrentTime;

        StorageReference filePath = productImagesRef.child(imageUri.getLastPathSegment() + productRandomKey);
        final UploadTask uploadTask = filePath.putFile(imageUri);

        //If the upload fails
        uploadTask.addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                String message = e.toString();
                Toast.makeText(AdminAddNewProductActivity.this, "Error: " + message, Toast.LENGTH_SHORT).show();
            }
        })//If upload is successfull
                .addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
                    @Override
                    public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
                        Toast.makeText(AdminAddNewProductActivity.this, "Image uploaded succesffuly", Toast.LENGTH_SHORT).show();

                        //Get URL of the image and store it in Firebase Database
                        Task urlUploadTask = uploadTask.continueWithTask(new Continuation<UploadTask.TaskSnapshot, Task<Uri>>() {
                            @Override
                            public Task<Uri> then(@NonNull Task<UploadTask.TaskSnapshot> task) throws Exception {
                                if (!task.isSuccessful()){
                                    throw task.getException();
                                }
                                downloadImageUrl =filePath.getDownloadUrl().toString();
                                return filePath.getDownloadUrl();
                            }
                        })//When the task is complete
                                .addOnCompleteListener(new OnCompleteListener<Uri>() {
                                    @Override
                                    public void onComplete(@NonNull Task<Uri> task) {
                                        if (task.isSuccessful()){
                                            downloadImageUrl = task.getResult().toString();

                                            Toast.makeText(AdminAddNewProductActivity.this, "Image saved to database successfully", Toast.LENGTH_SHORT).show();

                                            saveProductInfoToDatabase();
                                        }
                                    }
                                });
                    }
                });

    }

    private void saveProductInfoToDatabase() {
        HashMap<String, Object> productInfo = new HashMap<>();
        productInfo.put("id", productRandomKey);
        productInfo.put("date", saveCurrentDate);
        productInfo.put("time", saveCurrentTime);
        productInfo.put("description", description);
        productInfo.put("image", downloadImageUrl);// Gets the image Url
        productInfo.put("category", categoryName);
        productInfo.put("price", price);
        productInfo.put("product_name", name);

        productsRef.child(productRandomKey).updateChildren(productInfo).addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {
                if (task.isSuccessful()){
                    Intent intent = new Intent(AdminAddNewProductActivity.this, HomeActivity.class);
                    startActivity(intent);

                    Toast.makeText(AdminAddNewProductActivity.this, "Products added successfully", Toast.LENGTH_SHORT).show();
                }else{
                    String message = task.getException().toString();
                    Toast.makeText(AdminAddNewProductActivity.this, "Error: " + message, Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    private void openGallery() {
        Intent galleryIntent = new Intent();
        galleryIntent.setAction(Intent.ACTION_GET_CONTENT);
        galleryIntent.setType("image/*");
        galleryOpen.launch(galleryIntent);
    }
}