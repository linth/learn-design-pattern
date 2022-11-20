/**
 * Extract function
 * 
 */

// example.
{
    function pringCompany(companyName: string) {
        let ageCompany = 22;
        // ...

        console.log('company name', companyName);
        console.log('company age', ageCompany);
    }

    // recommendation 
    function pringCompany_after(companyName: string) {
        const ageCompany = 22;
        // ...

        function printAllInformation(companyName: string) {
            console.log('company name', companyName);
            console.log('company age', ageCompany);
        }

        printAllInformation(companyName);
        /**
         * ! result:
         * company name oring
         * company age 22
         */
    }

    pringCompany_after('oring');
}

// TODO: call by value, call by reference, ..., etc.