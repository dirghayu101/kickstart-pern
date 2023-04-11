import "./PaymentPage.css"

function PaymentPage() {
    return (

        <div>
            <h1>Payment Page</h1>
            <hr style={{ color: "yellow" }} />
            <h2>Personal Details</h2>
            <form> <p>
                <label for="fname">First Name:</label>
                <input type="text" placeholder="Dirghayu" />
            </p>
                <p><label for="lname">Last Name&#42;:</label> <input type="text" required placeholder="Joshi" /></p>
                <p>
                    <label for="Gender">Gender&#42;:</label>
                    <label for="male">Male</label>
                    <input type="radio" name="gender" id="male" required />
                    <label for="Female">Female</label>
                    <input type="radio" name="gender" id="Female" required />
                    <label for="Other">Other</label>
                    <input type="radio" name="gender" id="Other" required />
                </p>
                <p><label for="State&#42;" >Choose your State:</label>
                    <select name="Select your native State" id="Select your native State" required>
                        <option value=''>Select Your Native State</option>            <option value='AN' >Andaman and Nicobar Island </option><option value='AP' >Andhra Pradesh</option><option value='AR' >Arunachal Pradesh</option><option value='AS' >Assam</option><option value='BR' >Bihar</option><option value='CH' >Chandigarh </option><option value='CG' >Chhattisgarh</option><option value='DN' >Dadra and Nagar Haveli </option><option value='DD' >Daman and Diu </option><option value='DL' >Delhi (NCT)</option><option value='GA' >Goa</option><option value='GJ' >Gujarat</option><option value='HR' >Haryana</option><option value='HP' >Himachal Pradesh</option><option value='JK' >Jammu and Kashmir</option><option value='JH' >Jharkhand</option><option value='KA' >Karnataka</option><option value='KL' >Kerala</option><option value='LK' >Ladakh</option><option value='LD' >Lakshadweep </option><option value='MP' >Madhya Pradesh</option><option value='MH' >Maharashtra</option><option value='MN' >Manipur</option><option value='ML' >Meghalaya</option><option value='MZ' >Mizoram</option><option value='NL' >Nagaland</option><option value='OR' >Odisha</option><option value='PY' >Puducherry </option><option value='PB' >Punjab</option><option value='RJ' >Rajasthan</option><option value='SK' >Sikkim</option><option value='stateid' >statename</option><option value='TN' >Tamil Nadu</option><option value='TG' >Telangana</option><option value='TR' >Tripura</option><option value='UK' >Uttarakhand</option><option value='UP' >Uttar Pradesh</option><option value='WB' >West Bengal</option>
                    </select>
                    <p>  <label for="pin">Pin Code&#42;:</label>
                        <input type="number" name="quantity" id="quantity" min="100000" max="999999" required placeholder="123456" /> </p>

                </p>
                <p>
                    <label for="Contact Number">Contact Number:</label>
                    <input type="number" name="Contact Number" id="Contact Number" maxlength="10" placeholder="1234567890" />
                </p>
                <p>
                    <label for="Email">Email:</label>
                    <input type="email" name="email" id="email" placeholder="joshi@gmail.com" />
                </p>
                <p>
                    <a href="Payment Information.html">
                        <button type="submit">Go Ahead</button></a>
                    <button type="reset" onclick="alert('Are You Sure to Reset This')" >Reset</button>
                </p>
            </form>
        </div>
    );
}

export default PaymentPage