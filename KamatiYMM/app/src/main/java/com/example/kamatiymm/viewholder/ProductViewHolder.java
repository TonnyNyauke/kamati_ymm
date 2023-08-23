package com.example.kamatiymm.viewholder;

import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.kamatiymm.Interfaces.ItemClickListener;
import com.example.kamatiymm.R;
//This class accesses all our views
public class ProductViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
    public TextView txtProductName, txtProductDescription, txtProductPrice;
    public ImageView imageView;
    //Interface that holds the method onClick method
    private ItemClickListener listener;
    public ProductViewHolder(@NonNull View itemView) {
        super(itemView);
        txtProductName = itemView.findViewById(R.id.product_name_display);
        txtProductDescription = itemView.findViewById(R.id.product_description_display);
        txtProductPrice = itemView.findViewById(R.id.product_price_display);
        imageView = itemView.findViewById(R.id.product_image_display);
    }
    //Sends the user to the details of the product
    public void setItemClickListener(ItemClickListener listener){
        this.listener = listener;

    }

    @Override
    public void onClick(View v) {
        listener.onClick(v, getAbsoluteAdapterPosition(), false);
    }
}
