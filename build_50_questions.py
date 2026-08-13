"""
Question Database Builder & Generator
Generates 50 new unique exam questions across General Studies, Indian History, Science, Economics, and Aptitude.
"""

import os

NEW_QUESTIONS_BANK = """
---

### Question 1
**Which battle fought in 1510 led to the capture of Goa by Afonso de Albuquerque from the Sultan of Bijapur?**
- A) Battle of Diu
- B) Conquest of Goa (1510)
- C) Battle of Plassey
- D) Battle of Panipat

**Answer:** B) Conquest of Goa (1510)
**Explanation:** Afonso de Albuquerque conquered Goa in 1510 from Ismail Adil Shah, Sultan of Bijapur, establishing Portuguese rule for over 450 years.

---

### Question 2
**Which is the longest river located entirely within the state of Goa?**
- A) Mandovi River
- B) Zuari River
- C) Chapora River
- D) Sal River

**Answer:** B) Zuari River
**Explanation:** The Zuari River is the longest river in Goa (92 km long) flowing completely within the state.

---

### Question 3
**The famous Salim Ali Bird Sanctuary is named after Dr. Salim Ali, who was a renowned Indian:**
- A) Geologist
- B) Botanist
- C) Ornithologist
- D) Marine Biologist

**Answer:** C) Ornithologist
**Explanation:** Dr. Salim Ali (1896–1987) was known as the 'Birdman of India' and was a world-famous ornithologist.

---

### Question 4
**Under the Constitution of India, who appoints the Governor of Goa?**
- A) Chief Minister of Goa
- B) Chief Justice of India
- C) President of India
- D) Prime Minister of India

**Answer:** C) President of India
**Explanation:** Article 155 of the Indian Constitution states that the Governor of a State shall be appointed by the President of India.

---

### Question 5
**What is the minimum age required to become a member of the Goa Legislative Assembly (MLA)?**
- A) 18 years
- B) 21 years
- C) 25 years
- D) 30 years

**Answer:** C) 25 years
**Explanation:** Under Article 173(b) of the Constitution, the minimum age to be eligible for election to a State Legislative Assembly is 25 years.

---

### Question 6
**Which fundamental right was removed from the list of Fundamental Rights by the 44th Constitutional Amendment Act of 1978?**
- A) Right to Freedom of Speech
- B) Right to Property
- C) Right to Equality
- D) Right to Constitutional Remedies

**Answer:** B) Right to Property
**Explanation:** The 44th Amendment Act (1978) deleted the Right to Property as a Fundamental Right and made it a legal/constitutional right under Article 300A.

---

### Question 7
**Which gland in the human body is known as the 'Master Gland'?**
- A) Thyroid Gland
- B) Pituitary Gland
- C) Adrenal Gland
- D) Pancreas

**Answer:** B) Pituitary Gland
**Explanation:** The pituitary gland regulates the functions of most other endocrine glands in the body and is called the master gland.

---

### Question 8
**What is the chemical name of common salt?**
- A) Sodium Bicarbonate
- B) Sodium Chloride
- C) Potassium Chloride
- D) Calcium Carbonate

**Answer:** B) Sodium Chloride
**Explanation:** Common salt is chemically known as Sodium Chloride (NaCl).

---

### Question 9
**Who among the following was the founder of the Brahmo Samaj in 1828?**
- A) Swami Dayananda Saraswati
- B) Raja Ram Mohan Roy
- C) Swami Vivekananda
- D) Ishwar Chandra Vidyasagar

**Answer:** B) Raja Ram Mohan Roy
**Explanation:** Raja Ram Mohan Roy established the Brahmo Samaj in Kolkata in 1828 to reform Hindu society and abolish sati.

---

### Question 10
**In Indian Economics, what does 'NITI' in NITI Aayog stand for?**
- A) National Institution for Transforming India
- B) National Institute of Technology and Innovation
- C) National Initiative for Trade and Industry
- D) National Institute for Technical Integration

**Answer:** A) National Institution for Transforming India
**Explanation:** NITI Aayog stands for National Institution for Transforming India, established on 1st January 2015 replacing the Planning Commission.

---

### Question 11
**Which device is used to measure atmospheric pressure?**
- A) Thermometer
- B) Barometer
- C) Hygrometer
- D) Anemometer

**Answer:** B) Barometer
**Explanation:** A barometer is a scientific instrument used to measure atmospheric pressure.

---

### Question 12
**The Tropic of Cancer does NOT pass through which of the following Indian states?**
- A) Rajasthan
- B) Gujarat
- C) Odisha
- D) West Bengal

**Answer:** C) Odisha
**Explanation:** The Tropic of Cancer passes through 8 Indian states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram (It does not pass through Odisha).

---

### Question 13
**Which Viceregal palace in Old Goa was converted into the Archaeological Museum of Goa?**
- A) Reis Magos Fort
- B) Convent and Church of St. Francis of Assisi
- C) Aguada Fort
- D) Cabo Raj Bhavan

**Answer:** B) Convent and Church of St. Francis of Assisi
**Explanation:** The Archaeological Museum of Goa in Old Goa is maintained by the ASI in the annex of the Church of St. Francis of Assisi.

---

### Question 14
**Which Indian classical dance form originated in the state of Kerala?**
- A) Bharatanatyam
- B) Kathakali
- C) Kuchipudi
- D) Odissi

**Answer:** B) Kathakali
**Explanation:** Kathakali is a major form of classical Indian dance originating in Kerala.

---

### Question 15
**Which Vitamin deficiency causes the disease Rickets in children?**
- A) Vitamin A
- B) Vitamin B1
- C) Vitamin C
- D) Vitamin D

**Answer:** D) Vitamin D
**Explanation:** Vitamin D deficiency leads to softening and weakening of bones in children, known as Rickets.

---

### Question 16
**Who wrote the national song of India, 'Vande Mataram'?**
- A) Rabindranath Tagore
- B) Bankim Chandra Chattopadhyay
- C) Sarojini Naidu
- D) Subramania Bharati

**Answer:** B) Bankim Chandra Chattopadhyay
**Explanation:** 'Vande Mataram' was composed by Bankim Chandra Chattopadhyay in his 1882 novel *Anandamath*.

---

### Question 17
**What is the SI unit of Electric Current?**
- A) Volt
- B) Ohm
- C) Ampere
- D) Watt

**Answer:** C) Ampere
**Explanation:** The Ampere (A) is the SI unit of electric current.

---

### Question 18
**Which Viceroy of India introduced the Doctrine of Lapse policy?**
- A) Lord Canning
- B) Lord Dalhousie
- C) Lord Curzon
- D) Lord William Bentinck

**Answer:** B) Lord Dalhousie
**Explanation:** Lord Dalhousie (Governor-General from 1848 to 1856) introduced the Doctrine of Lapse to annex princely states.

---

### Question 19
**Which metal is liquid at room temperature?**
- A) Sodium
- B) Mercury
- C) Aluminum
- D) Magnesium

**Answer:** B) Mercury
**Explanation:** Mercury (Hg) is the only metal element that remains liquid at standard room temperature.

---

### Question 20
**In computer terminology, what does 'RAM' stand for?**
- A) Read Access Memory
- B) Random Access Memory
- C) Rapid Action Memory
- D) Remote Access Module

**Answer:** B) Random Access Memory
**Explanation:** RAM stands for Random Access Memory, the primary volatile memory of a computer.

---

### Question 21
**Which gas is most abundant in Earth's atmosphere?**
- A) Oxygen
- B) Nitrogen
- C) Carbon Dioxide
- D) Argon

**Answer:** B) Nitrogen
**Explanation:** Nitrogen makes up approximately 78% of the Earth's atmosphere by volume.

---

### Question 22
**Who was the first President of Independent India?**
- A) Dr. S. Radhakrishnan
- B) Dr. Rajendra Prasad
- C) Dr. B.R. Ambedkar
- D) Jawaharlal Nehru

**Answer:** B) Dr. Rajendra Prasad
**Explanation:** Dr. Rajendra Prasad served as the first President of India from 1950 to 1962.

---

### Question 23
**Which schedule of the Indian Constitution contains the 22 officially recognized languages?**
- A) Seventh Schedule
- B) Eighth Schedule
- C) Ninth Schedule
- D) Tenth Schedule

**Answer:** B) Eighth Schedule
**Explanation:** The Eighth Schedule of the Indian Constitution lists the 22 official languages of the Republic of India (including Konkani).

---

### Question 24
**What is the capital of North Goa district?**
- A) Margao
- B) Panaji
- C) Vasco da Gama
- D) Mapusa

**Answer:** B) Panaji
**Explanation:** Panaji (Panjim) is the headquarters of North Goa district and the state capital of Goa.

---

### Question 25
**What is the capital of South Goa district?**
- A) Ponda
- B) Margao
- C) Quepem
- D) Mormugao

**Answer:** B) Margao
**Explanation:** Margao (Madgaon) is the administrative headquarters of South Goa district.

---

### Question 26
**Which Fort in Goa overlooks the confluence of the Mandovi River and Arabian Sea and features a 4-storey lighthouse?**
- A) Aguada Fort
- B) Chapora Fort
- C) Reis Magos Fort
- D) Cabo de Rama Fort

**Answer:** A) Aguada Fort
**Explanation:** Built in 1612 by the Portuguese, Fort Aguada overlooks Sinquerim beach and Mandovi River with a historic lighthouse.

---

### Question 27
**Which river flows past the famous Chapora Fort in North Goa?**
- A) Chapora River
- B) Sal River
- C) Talpona River
- D) Galgibaga River

**Answer:** A) Chapora River
**Explanation:** Chapora Fort is located on the southern headland of the Chapora River in Bardez taluka.

---

### Question 28
**Which is the state animal of Goa?**
- A) Gaur (Indian Bison)
- B) Tiger
- C) Sambar Deer
- D) Elephant

**Answer:** A) Gaur (Indian Bison)
**Explanation:** The Gaur (Bos gaurus), or Indian Bison, is the state animal of Goa.

---

### Question 29
**Which is the state bird of Goa?**
- A) Indian Roller
- B) Flame-throated Bulbul (Rubigula)
- C) Peacock
- D) Great Hornbill

**Answer:** B) Flame-throated Bulbul (Rubigula)
**Explanation:** The Flame-throated Bulbul (also called Rubigula) is the state bird of Goa.

---

### Question 30
**Which is the state tree of Goa?**
- A) Banyan Tree
- B) Matti (Terminalia elliptica / Asan)
- C) Coconut Palm
- D) Neem Tree

**Answer:** B) Matti (Terminalia elliptica / Asan)
**Explanation:** Matti (Crocodile Bark tree) is declared as the state tree of Goa.

---

### Question 31
**Which is the state flower of Goa?**
- A) Lotus
- B) Red Jasmine (Jasmine)
- C) Rose
- D) Marigold

**Answer:** B) Red Jasmine (Jasmine)
**Explanation:** Red Jasmine is recognized as the state flower of Goa.

---

### Question 32
**Which Goan GI-tagged alcoholic beverage is distilled from cashew apples or coconut sap?**
- A) Feni
- B) Toddy
- C) Arrack
- D) Urak

**Answer:** A) Feni
**Explanation:** Cashew Feni received Geographical Indication (GI) registration in 2009 as a traditional Goan liquor.

---

### Question 33
**Which Goan village is famous for the 'Reis Magos Fort' built in 1551?**
- A) Nerul
- B) Reis Magos (Verem)
- C) Candolim
- D) Calangute

**Answer:** B) Reis Magos (Verem)
**Explanation:** Reis Magos Fort sits on the northern bank of Mandovi river at Verem village in Bardez.

---

### Question 34
**What is the minimum passing age for obtaining a permanent Motor Vehicle Driving License in India?**
- A) 16 years
- B) 18 years
- C) 21 years
- D) 25 years

**Answer:** B) 18 years
**Explanation:** Under the Motor Vehicles Act, the minimum age for a permanent driving license for motor vehicles is 18 years.

---

### Question 35
**Which sanctuary in South Goa is known for ancient rock carvings along the Kushavati River?**
- A) Usgalimal Rock Carvings
- B) Bondla Sanctuary
- C) Salim Ali Sanctuary
- D) Cotigao Sanctuary

**Answer:** A) Usgalimal Rock Carvings
**Explanation:** Usgalimal rock petroglyphs in Sanguem taluka date back to the Upper Paleolithic/Mesolithic era along the banks of Kushavati River.

---

### Question 36
**Which Goan scientist was the former Chairman of the Indian Space Research Organisation (ISRO)?**
- A) Dr. R.A. Mashelkar
- B) Dr. K. Kasturirangan
- C) Dr. Anil Kakodkar
- D) Dr. Shailesh Nayak

**Answer:** A) Dr. R.A. Mashelkar
**Explanation:** Eminent Goan scientist Dr. R.A. Mashelkar is a renowned chemical engineer and former Director-General of CSIR.

---

### Question 37
**Which is the primary iron ore export port of Goa?**
- A) Panaji Port
- B) Mormugao Port
- C) Talpona Port
- D) Chapora Port

**Answer:** B) Mormugao Port
**Explanation:** Mormugao Port handles a major share of India's iron ore exports mined in Goa.

---

### Question 38
**In which year did the Daman and Diu Enclaves separate administratively from Goa when Goa became a full state?**
- A) 1961
- B) 1971
- C) 1987
- D) 1992

**Answer:** C) 1987
**Explanation:** On 30 May 1987, Goa became the 25th state while Daman and Diu remained separate Union Territories.

---

### Question 39
**What is the average annual rainfall received by Goa during the South-West Monsoon?**
- A) 1,000 mm
- B) 3,000 mm to 3,500 mm
- C) 5,000 mm
- D) 500 mm

**Answer:** B) 3,000 mm to 3,500 mm
**Explanation:** Goa receives heavy rainfall averaging around 3,000 mm to 3,500 mm annually between June and September.

---

### Question 40
**Which famous beach in South Goa is known for its serene white sand and proximity to Colva?**
- A) Baga Beach
- B) Benaulim Beach
- C) Anjuna Beach
- D) Calangute Beach

**Answer:** B) Benaulim Beach
**Explanation:** Benaulim beach is a popular serene white-sand beach located in South Goa near Margao and Colva.

---

### Question 41
**What is the length of the coastline of Goa?**
- A) 50 km
- B) 101 km (approx 160 km including estuaries)
- C) 300 km
- D) 500 km

**Answer:** B) 101 km (approx 160 km including estuaries)
**Explanation:** Goa has a continuous tropical coastline of about 101 km facing the Arabian Sea.

---

### Question 42
**Which island in Goa is known for the historical St. Jacinto Church and lighthouse bridge?**
- A) St. Jacinto Island
- B) Chorao Island
- C) Divar Island
- D) Corjuem Island

**Answer:** A) St. Jacinto Island
**Explanation:** St. Jacinto Island in South Goa is connected by a bridge over the Zuari estuary and houses St. Jacinto Church.

---

### Question 43
**Which Goa Chief Minister also served as the Defence Minister of India?**
- A) Dayanand Bandodkar
- B) Pratapsingh Rane
- C) Manohar Parrikar
- D) Digambar Kamat

**Answer:** C) Manohar Parrikar
**Explanation:** Late Manohar Parrikar served as Chief Minister of Goa and as Union Defence Minister of India from 2014 to 2017.

---

### Question 44
**Which international airport in Goa was inaugurated at Mopa in Pernem taluka?**
- A) Dabolim Airport
- B) Manohar International Airport (Mopa)
- C) Chhatrapati Shivaji Airport
- D) Panaji Airport

**Answer:** B) Manohar International Airport (Mopa)
**Explanation:** Manohar International Airport at Mopa in North Goa commenced operations in January 2023.

---

### Question 45
**Which festival in Goa is marked by jumping into wells and streams to celebrate St. John the Baptist?**
- A) Sao Joao
- B) Bonderam
- C) Shigmo
- D) Carnival

**Answer:** A) Sao Joao
**Explanation:** Sao Joao is celebrated on June 24 every monsoon, where villagers wear flower crowns ('kopel') and jump into wells.

---

### Question 46
**Which is the official newspaper printed in Konkani in Devanagari script in Goa?**
- A) Sunaparant (historic) / Bhaangar Bhuin
- B) Tarun Bharat
- C) O Heraldo
- D) The Navhind Times

**Answer:** A) Sunaparant (historic) / Bhaangar Bhuin
**Explanation:** *Bhaangar Bhuin* is a prominent contemporary daily newspaper published in Konkani (Devanagari script).

---

### Question 47
**Which dam in Goa built across the Sanguem River supplies water to South Goa?**
- A) Salaulim Dam
- B) Anjunem Dam
- C) Tillari Dam
- D) Chapoli Dam

**Answer:** A) Salaulim Dam
**Explanation:** Salaulim Dam in Sanguem taluka is the largest water reservoir supplying drinking and irrigation water to South Goa.

---

### Question 48
**Which dam in North Goa is built across the Costi River in Sattari taluka?**
- A) Salaulim Dam
- B) Anjunem Dam
- C) Chapoli Dam
- D) Panchwadi Dam

**Answer:** B) Anjunem Dam
**Explanation:** Anjunem Dam is located in Sattari taluka in North Goa.

---

### Question 49
**What is the maximum strength of the Council of Ministers in Goa (including the Chief Minister)?**
- A) 6 Ministers
- B) 12 Ministers
- C) 15 Ministers
- D) 20 Ministers

**Answer:** B) 12 Ministers
**Explanation:** Under the 91st Constitutional Amendment Act 2003, the total number of ministers (including CM) in a State with 40 seats cannot exceed 12 (or 15% of assembly strength, min 12).

---

### Question 50
**Which Goan freedom fighter wrote the famous book 'Denationalisation of Goans'?**
- A) T.B. Cunha
- B) Dr. Julião Menezes
- C) Purushottam Kakodkar
- D) Luis de Menezes Bragança

**Answer:** A) T.B. Cunha
**Explanation:** T.B. Cunha published 'Denationalisation of Goans' in 1944 to expose Portuguese cultural suppression in Goa.
"""

def generate_50_questions():
    print("=" * 60)
    print("[QUESTION DATABASE GENERATOR SYSTEM]")
    print("=" * 60)

    target_file = os.path.join("data", "general_knowledge_india.md")
    with open(target_file, "w", encoding="utf-8") as f:
        f.write("# General Knowledge & National GS - 50 Master Questions\n")
        f.write(NEW_QUESTIONS_BANK)

    print(f"[SUCCESS] Appended 50 new unique questions to {target_file}")

if __name__ == "__main__":
    generate_50_questions()
