package com.mybaseprojectandroid.ui.examples.firebase.crud

import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import com.mybaseprojectandroid.R
import com.mybaseprojectandroid.ui.examples.firebase.ExamplesFirebaseViewModel
import com.mybaseprojectandroid.utils.other.FactoryViewModel

class ExamplesFirebaseCrudFragment : Fragment(R.layout.examples_firebase_crud_fragment) {

    private val viewModel: ExamplesFirebaseCrudViewModel by viewModels {
        FactoryViewModel(ExamplesFirebaseViewModel())
    }

}