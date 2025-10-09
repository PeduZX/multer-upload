# multer-upload

<img width="531" height="232" alt="image" src="https://github.com/user-attachments/assets/3b8dd300-eda3-4437-bb8a-d29ac104322b" />

<img width="502" height="35" alt="image" src="https://github.com/user-attachments/assets/fca0ed1a-7401-45bc-b142-4640af0437c2" />

CREATE DATABASE upload;
USE upload;

CREATE TABLE imagens(
id INT AUTO_INCREMENT PRIMARY KEY,
nome_original varchar(255),
nome_arquivo VARCHAR(255),
data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);

SELECT * FROM imagens;
