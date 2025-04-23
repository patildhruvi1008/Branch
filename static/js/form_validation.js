document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const form = document.getElementById('predictionForm');
    
    if (form) {
        // Update max score and hint based on exam type
        const examTypeSelect = document.getElementById('exam_type');
        const examScoreInput = document.getElementById('exam_score');
        const scoreHint = document.getElementById('score_hint');
        const examLabel = document.getElementById('exam_label');
        
        examTypeSelect.addEventListener('change', function() {
            const selectedExam = this.value;
            
            if (selectedExam === 'JEE') {
                examScoreInput.setAttribute('max', '300');
                scoreHint.textContent = 'Score should be between 0 and 300';
                examLabel.textContent = 'JEE Score';
            } else if (selectedExam === 'MHT-CET') {
                examScoreInput.setAttribute('max', '200');
                scoreHint.textContent = 'Score should be between 0 and 200';
                examLabel.textContent = 'MHT-CET Score';
            }
        });
        
        // Bootstrap form validation
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            
            // Custom validations
            const categorySelect = document.getElementById('category');
            const examScore = parseFloat(examScoreInput.value);
            
            if (examTypeSelect.value && categorySelect.value && !isNaN(examScore)) {
                let isValid = true;
                let errorMessage = '';
                
                // Check JEE cutoffs
                if (examTypeSelect.value === 'JEE') {
                    if (categorySelect.value.toLowerCase() === 'general' && examScore < 90) {
                        isValid = false;
                        errorMessage = 'General category requires at least 90 marks in JEE';
                    }
                }
                // Check MHT-CET cutoffs
                else if (examTypeSelect.value === 'MHT-CET') {
                    if (categorySelect.value.toLowerCase() === 'general' && examScore < 90) {
                        isValid = false;
                        errorMessage = 'General category requires at least 90 marks in MHT-CET';
                    } else if (categorySelect.value.toLowerCase() !== 'general' && examScore < 80) {
                        isValid = false;
                        errorMessage = 'Reserved categories require at least 80 marks in MHT-CET';
                    }
                }
                
                if (!isValid) {
                    event.preventDefault();
                    examScoreInput.setCustomValidity(errorMessage);
                    document.getElementById('score_feedback').textContent = errorMessage;
                } else {
                    examScoreInput.setCustomValidity('');
                }
            }
            
            form.classList.add('was-validated');
        });
        
        // Clear custom validity when input changes
        examScoreInput.addEventListener('input', function() {
            this.setCustomValidity('');
        });
    }
});
