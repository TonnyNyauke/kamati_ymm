package com.example.kamatiymm;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.List;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link MedicalPrograms#newInstance} factory method to
 * create an instance of this fragment.
 */
public class MedicalPrograms extends Fragment {

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public MedicalPrograms() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment MedicalPrograms.
     */
    // TODO: Rename and change types and number of parameters
    public static MedicalPrograms newInstance(String param1, String param2) {
        MedicalPrograms fragment = new MedicalPrograms();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_medical_programs, container, false);
        final Spinner diseasesSpinner = view.findViewById(R.id.diseases_list);
        final Spinner subDiseasesSpinner = view.findViewById(R.id.sub_diseases_list);

        //Populating the Spinner from the database.
        DatabaseReference diseaseDatabaseReference = FirebaseDatabase.getInstance().getReference("disease_programmes");
        diseaseDatabaseReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot snapshot) {
                final List<String> diseases = new ArrayList<String>();
                for (DataSnapshot diseaseSnapshot: snapshot.getChildren())
                {
                    //Gets disease name from database and adds it to the Spinner.
                    String diseaseName = diseaseSnapshot.child("diseaseName").getValue(String.class);
                    diseases.add(diseaseName);
                }
                ArrayAdapter<String> diseasesAdapter = new ArrayAdapter<>(getActivity(), android.R.layout.simple_spinner_item, diseases);
                diseasesAdapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                diseasesSpinner.setAdapter(diseasesAdapter);
            }

            @Override
            public void onCancelled(@NonNull DatabaseError error) {

            }
        });
        return view;
    }
}