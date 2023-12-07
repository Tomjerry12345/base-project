package com.mybaseprojectandroid.ui.examples.widget

import android.os.Bundle
import android.view.View
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import com.mybaseprojectandroid.R
import com.mybaseprojectandroid.databinding.ExamplesWidgetFragmentBinding
import com.mybaseprojectandroid.utils.other.FactoryViewModel

class ExamplesWidgetFragment : Fragment(R.layout.examples_widget_fragment) {

    private val viewModel: ExamplesWidgetViewModel by viewModels {
        FactoryViewModel(ExamplesWidgetViewModel())
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)
        val binding = ExamplesWidgetFragmentBinding.bind(view)
        binding.viewModel = viewModel
    }

}